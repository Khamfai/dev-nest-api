import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { PrismaService } from 'nestjs-prisma';
import { CRUD } from 'src/interfaces/crud.interface';
import { Transactions } from '@prisma/client';
import { PaginationDto } from 'src/dto/pagination.dto';
import { pageOffset } from 'src/utils/offset.util';
import { CreateStockDto } from 'src/stocks/dto/stock.dto';

@Injectable()
export class TransactionsService implements CRUD<Transactions> {
  constructor(private client: PrismaService) {}
  count(shopId?: number): Promise<number> {
    return this.client.transactions.count({
      where: { shopId, isDeleted: false },
    });
  }

  async create(data: CreateTransactionDto): Promise<Transactions | null> {
    const stocks: CreateStockDto[] = [];

    for (const [index, item] of data.items.entries()) {
      data.items[index].createdBy = data.createdBy;
      data.items[index].createdAt = Date.now();

      const product = await this.client.products.findUnique({
        include: {
          stocks: {
            where: {
              remaining: { gt: 0 },
              expDate: { gt: Date.now() },
              isDeleted: false,
            },
            orderBy: { expDate: 'asc' },
            take: 5,
          },
        },
        where: { id: item.proId, isDeleted: false },
      });

      //! Throw out when not found or stock not be enough to sell.
      if (!product) throw new Error(`ບໍ່ພົບສິນຄ້າ ຫຼື ສິນຄ້າບໍ່ພໍພຽງ`);

      //! Skip if product have no stock
      if (!product.hasStock) continue;

      let qty2shell = item.qty;
      for (const stk of product.stocks) {
        //! Stop when the stock enough to sell.
        if (qty2shell <= 0) break;

        const canSell = Math.min(stk.remaining, qty2shell);
        stocks.push({
          shopId: stk.shopId,
          prodId: stk.prodId,
          qty: -canSell,
          remaining: stk.remaining - canSell,
          expDate: stk.expDate ?? undefined,
          createdBy: data.createdBy,
          createdAt: Date.now(),
        });
        qty2shell -= canSell;
      }

      //! Throw out when the stock not be enough to sell.
      if (qty2shell > 0) throw new Error(`ສິນຄ້າບໍ່ພໍພຽງ`);
    }

    const ts = await this.client.$transaction([
      this.client.transactions.create({
        data: {
          shopId: data.shopId,
          paymentId: data.paymentId,
          currId: data.currId,
          tableId: data.tableId,
          cusId: data.cusId,
          promoId: data.promoId,
          billNo: data.billNo,
          subTotal: data.subTotal,
          discount: data.discount,
          disVal: data.disVal,
          sercharge: data.sercharge,
          serVal: data.serVal,
          vat: data.vat,
          vatVal: data.vatVal,
          total: data.total,
          moneyRecv: data.moneyRecv,
          moneyChg: data.moneyChg,
          people: data.people,
          rate: data.rate,
          printStt: data.printStt,
          paymentStt: data.paymentStt,
          tsType: data.tsType,
          comment: data.comment,
          createdBy: data.createdBy,
          createdAt: Date.now(),
          transactionDetails: {
            createMany: { data: data.items },
          },
        },
      }),

      this.client.stocks.createMany({ data: stocks }),
    ]);

    return ts[0];
  }

  async findAll(
    shopId: number,
    params?: PaginationDto,
  ): Promise<Transactions[]> {
    const skip = pageOffset(params);
    return this.client.transactions.findMany({
      include: { transactionDetails: true, tables: true },
      where: { shopId, isDeleted: false },
      skip,
      take: params?.limit,
    });
  }

  findOne(id: number) {
    return this.client.transactions.findUnique({
      include: { transactionDetails: true, tables: true },
      where: { id },
    });
  }

  update(id: number, data: UpdateTransactionDto) {
    return this.client.transactions.update({
      data: { ...data, updatedAt: Date.now() },
      where: { id },
    });
  }

  remove(id: number) {
    return this.client.transactions.update({
      data: { isDeleted: true, updatedAt: Date.now() },
      where: { id },
    });
  }
}

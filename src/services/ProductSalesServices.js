const ProductModel = require('../model/ProductModel');
const saleModel = require('../model/saleModel');

const ProductsTotalSalesRevenue = async (req) => {
  try {
    const data = await saleModel.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: { $multiply: ['$quantity', '$price'] } }
        }
      }
    ]);
console.log(data)
    // Access the totalRevenue from the result
    const totalRevenue = data.length > 0 ? data[0].totalRevenue : 0;

    console.log('Total Revenue:', totalRevenue);
    
    return { status: "success", data: data };
  } catch (e) {
    console.log(e)
    return { status: "fail", data: e };
  }
}
const ProductsQuantityBySale = async (req) => {
  try {
    const data = await saleModel.aggregate([
      {
        $group: {
          _id: '$product',
          totalQuantity: { $sum: "$quantity" }
        }
      }
    ]);
console.log(data)
    // Access the totalQuantity from the result
    // const totalQuantity =data[0].totalQuantity+data[1].totalQuantity;
    console.log('Total quantity:', totalQuantity);
    
    return { status: "success", data: data };
  } catch (e) {
    return { status: "fail", data: e };
  }
}
const ProductsTopBySale = async (req) => {
  try {
    const data = await saleModel.aggregate([
      {
        $group: {
          _id: "$product",
          totalRevenue: { $sum: { $multiply: ["$quantity", "$price"] } }
        }
      },
      {
        $sort: { totalRevenue: -1 }
      },
      {
        $limit: 5
      }
    ]);
console.log(data)
    // console.log('Total totalRevenue:', totalRevenue);
    
    return { status: "success", data: data };
  } catch (e) {
    return { status: "fail", data: e };
  }
}
const ProductsAveragePriceBySale = async (req) => {
  try {
    const data = await saleModel.aggregate([
      {
        $group: {
          _id: null,
          averagePrice: { $avg: "$price" }
        }
      }
    ]);
// console.log(data)
const averagePrice = data.length > 0 ? data[0].averagePrice : 0;
    console.log(averagePrice)
    return { status: "success", data: data };
  } catch (e) {
    return { status: "fail", data: e };
  }
}
const ProductsRevenuePriceByMonthYear = async (req) => {
  try {
    const data = await saleModel.aggregate([
      {
        $project: {
          monthYear: {
            $dateToString: { format: "%Y-%m", date: "$date" }
          },
          totalRevenue: { $multiply: ["$quantity", "$price"] }
        }
      },
      {
        $group: {
          _id: "$monthYear",
          totalRevenue: { $sum: "$totalRevenue" }
        }
      },
      {
        $project: {
          _id: 0, // Exclude _id field from the result
          monthYear: "$_id",
          totalRevenue: 1
        }
      }
    ]);

    console.log(data);

    return { status: "success", data: data };
  } catch (e) {
    return { status: "fail", data: e };
  }
}
const ProductsRevenuePriceByDay = async (req) => {
  try {
    const data = await saleModel.aggregate([
      {
        $group: {
          _id: {
            date: "$date",
            product: "$product"
          },
          totalQuantity: { $sum: "$quantity" }
        }
      },
      {
        $sort: { totalQuantity: -1 }
      },
      {
        $limit: 1
      },
      {
        $project: {
          _id: 0,
          product: "$_id.product",
          date: "$_id.date",
          totalQuantity: 1
        }
      }
    ]);

    console.log(data);

    return { status: "success", data: data };
  } catch (e) {
    return { status: "fail", data: e };
  }
}


module.exports = {
  ProductsTotalSalesRevenue,
  ProductsQuantityBySale,
  ProductsTopBySale,
  ProductsAveragePriceBySale,
  ProductsRevenuePriceByMonthYear,
  ProductsRevenuePriceByDay

}

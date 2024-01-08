const { ProductsTotalSalesRevenue, ProductsQuantityBySale, ProductsTopBySale, ProductsAveragePriceBySale, ProductsRevenuePriceByMonthYear, } = require("../services/ProductSalesServices");


const TotalRevenue=async(req,res)=>{
    let result=await ProductsTotalSalesRevenue(req);
    return res.status(200).json(result)
}
const TotalQuantity=async(req,res)=>{
let result=await ProductsQuantityBySale(req);
return res.status(200).json(result)
}
const TopProducts=async(req,res)=>{
let result=await ProductsTopBySale(req);
return res.status(200).json(result)
}
const AveragePrice=async(req,res)=>{
let result=await ProductsAveragePriceBySale(req);
return res.status(200).json(result)
}
const RevenueByMonth=async(req,res)=>{
let result=await ProductsRevenuePriceByMonthYear(req);
return res.status(200).json(result)
}

module.exports={
    TotalRevenue,
    TotalQuantity,
    TopProducts,
    AveragePrice,
    RevenueByMonth
}
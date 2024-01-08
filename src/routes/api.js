const express=require('express');
const ProductSalesController=require('../controller/ProductSalesController')


const router=express.Router()


//sale of products
router.get('/TotalRevenue',ProductSalesController.TotalRevenue)
router.get('/TotalQuantity',ProductSalesController.TotalQuantity)
router.get('/TopProducts',ProductSalesController.TopProducts)
router.get('/AveragePrice',ProductSalesController.AveragePrice)
router.get('/RevenueByMonth',ProductSalesController.RevenueByMonth)
module.exports=router;
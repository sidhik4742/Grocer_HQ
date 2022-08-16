import React, { useEffect, useRef, useState } from 'react'
import { axiosInstance } from '../../config/axios.config'

import Header from '../Header/header.component'

function ProductListing() {
    const [products, setProducts] = React.useState([])
    const [isChecked, setIsChecked] = React.useState(false)
    const [categories, setCategories] = React.useState([])

    let allCategory = useRef(null);
    let allProducts = useRef(null);

    const getAllProducts = async () => {
        allProducts.current = await axiosInstance.get('/products')
        // console.log('allProducts', allProducts.current.data);
        setProducts(allProducts.current.data)
    }

    const getAllCategories = async () => {
        allCategory.current = await axiosInstance.get('/categories')
        // console.log('allCategory', allCategory.current.data);
        let categories = allCategory.current.data.data || []
        categories.forEach(category => {
            category.isChecked = false
        })
        setCategories(categories)
        console.log('allCategory', categories);   
    }


    const getCheckedStatus = (event,id) => {
        console.log('id', id);
        let c = [...categories]
        c.find(category => {
            if(category._id === id) {
                console.log('category', category)
                category.isChecked = !category.isChecked
            }
        });
        console.log('c', c);
        setCategories(c)
    }


    const addToCart = async (e) => {
        // console.log('id', id);
        // try{
        //     let c = [...allProducts.current.data];
        //     let findProduct = c.find(product => product._id === id);
        //     console.log('findProduct', findProduct);
        //     let cartData = {
        //         category_id: findProduct.category_id,
        //         product_id: findProduct._id,
        //     }
        //     let resp = await axiosInstance.post('/cart/add', cartData)
        //     console.log('resp', resp.data);
        // }
        // catch(error){
        //     console.log(error);
        // }
    }



    useEffect(() => {
        getAllProducts();
    } , [])

    useEffect(() => {
        getAllCategories();
    } , [])



  return (
    <>
        <Header></Header>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css" rel="stylesheet"/>

            <div className="container-fluid pt-5">
                <div className="row px-xl-5 pt-5">
                <div className="col-lg-3 col-md-12">
                        
                        <div className="border-bottom mb-4 pb-4">
                            <h5 className="font-weight-semi-bold mb-4">Filter by price</h5>
                            <form>
                                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                                    <input type="checkbox" className="custom-control-input" id="price-all"/>
                                    <label className="custom-control-label" for="price-all">All Price</label>
                                    <span className=" border badge font-weight-normal text-dark w-25 ">1000</span>
                                </div>
                                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                                    <input type="checkbox" className="custom-control-input" id="price-1"/>
                                    <label className="custom-control-label" for="price-1">$0 - $20</label>
                                    <span className="badge border font-weight-normal text-dark w-25  ">15</span>
                                </div>
                                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                                    <input type="checkbox" className="custom-control-input" id="price-2"/>
                                    <label className="custom-control-label" for="price-2">$20 - $40</label>
                                    <span className="badge border font-weight-normal text-dark w-25 ">10</span>
                                </div>
                                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                                    <input type="checkbox" className="custom-control-input" id="price-3"/>
                                    <label className="custom-control-label" for="price-3">$40 - $60</label>
                                    <span className="badge border font-weight-normal text-dark w-25 ">4</span>
                                </div>
                                
                            </form>
                        </div>
                        <div className="border-bottom mb-4 pb-4">
                            <h5 className="font-weight-semi-bold mb-4">Filter by Category</h5>
                            <form>
                                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                                    <input type="checkbox" className="custom-control-input" id="color-all"/>
                                    <label className="custom-control-label" for="price-all ">All</label>
                                    <span className="badge border font-weight-normal text-dark w-25 ">100</span>
                                </div>
                                {categories &&categories.map((category, index) => {
                                    return (
                                    <div key={index} className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                                        <input type="checkbox" className="custom-control-input" id="color-1" checked={category.isChecked} onClick={(e)=>getCheckedStatus(e,category._id)} />
                                        <label className="custom-control-label" for="color-1">{category.name}</label>
                                        <span className="badge border font-weight-normal text-dark w-25 "> 5</span>
                                    </div>  
                                )})}
                            </form>
                        </div>
                        

                
                        
                    </div>
                    <div className="col-lg-9 col-md-12">
                        <div className="row pb-3">
                            <div className="col-12 pb-1">
                                <div className="d-flex align-items-center justify-content-between mb-4">
                                    <form action="">
                                        <div className="input-group">
                                            <input type="text" className="form-control" placeholder="Search by name"/>
                                            <div className="input-group-append">
                                                <span className="input-group-text bg-transparent text-primary">
                                                    <i className="fa fa-search"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </form>
                                    <div className="dropdown ml-4">
                                        <button className="btn border dropdown-toggle" type="button" id="triggerId" data-toggle="dropdown" aria-haspopup="true"
                                                aria-expanded="false">
                                                    Sort by
                                                </button>
                                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="triggerId">
                                            <a className="dropdown-item" href="#">Latest</a>
                                            <a className="dropdown-item" href="#">Popularity</a>
                                            <a className="dropdown-item" href="#">Best Rating</a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {products? products.map((product, index) => {
                            return (
                            <div key={index} className="col-lg-4 col-md-6 col-sm-12 pb-1">
                                <div className="card product-item border-0 mb-4 w-100 h-100 ">
                                    <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                                        <img className="img-fluid w-100" src={`/assets/assets/${product.image}`} alt=""/>
                                    </div>
                                    <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
                                        <h6 className="text-truncate mb-3">{product.name}</h6>
                                        <div className="d-flex justify-content-center">
                                            <h6>${product.price}</h6><h6 className="text-muted ml-2"><del>$23.00</del></h6>
                                        </div>
                                    </div>
                                    <div className="card-footer d-flex justify-content-between bg-light border">
                                        <a className="btn btn-sm text-dark p-0"><i className="fas fa-eye text-primary mr-1"></i>View Detail</a>
                                        <a className="btn btn-sm text-dark p-0" onClick={()=>addToCart(product._id)} ><i className="fas fa-shopping-cart text-primary mr-1"></i>Add To Cart</a>
                                    </div>
                                </div>
                            </div>)}):
                            <>
                            <div className="col-lg-4 col-md-6 col-sm-12 pb-1 h-100 w-100 ">
                                <p className=' text-center h2' >Oops!</p>
                                <p className='text-center h4' 
                                >No Products available. </p>
                            </div>
                            </>
                            }
                        
                        </div>
                            {products && <div className="col-12 pb-1">
                                <nav aria-label="Page navigation">
                                <ul className="pagination justify-content-center mb-3">
                                    <li className="page-item disabled">
                                    <a className="page-link" href="#" aria-label="Previous">
                                        <span aria-hidden="true">&laquo;</span>
                                        <span className="sr-only">Previous</span>
                                    </a>
                                    </li>
                                    <li className="page-item active"><a className="page-link" href="#">1</a></li>
                                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                                    <li className="page-item">
                                    <a className="page-link" href="#" aria-label="Next">
                                        <span aria-hidden="true">&raquo;</span>
                                        <span className="sr-only">Next</span>
                                    </a>
                                    </li>
                                </ul>
                                </nav>
                            </div>}
                        </div>
                    </div>
            
        </div>
<a href="#" className="btn btn-primary back-to-top"><i className="fa fa-angle-double-up"></i></a>
<script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.bundle.min.js"></script>      
    <script src="../ProductListing/main.js"></script>


</>
  )
}

export default ProductListing
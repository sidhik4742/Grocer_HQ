import React, { useEffect, useRef, useState } from 'react'
import { axiosInstance } from '../../config/axios.config'

import Header from '../Header/header.component'

function ProductListing() {
    const [products, setProducts] = React.useState()

    let allProducts = useRef(null);

    const getAllProducts = async () => {
        allProducts.current = await axiosInstance.get('/products')
        console.log('allProducts', allProducts.current.data);
        setProducts(allProducts.current.data)
    }

    const addToCart = async (id) => {
        console.log('id', id);
        try{
            let c = [...allProducts.current.data];
            let findProduct = c.find(product => product._id === id);
            console.log('findProduct', findProduct);
            let cartData = {
                category_id: findProduct.category_id,
                product_id: findProduct._id,
            }
            let resp = await axiosInstance.post('/cart/add', cartData)
            console.log('resp', resp.data);
        }
        catch(error){
            console.log(error);
        }
    }



    useEffect(() => {
        getAllProducts()
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
                                    <input type="checkbox" className="custom-control-input" checked id="price-all"/>
                                    <label className="custom-control-label" for="price-all">All Price</label>
                                    <span className="badge border font-weight-normal">1000</span>
                                </div>
                                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                                    <input type="checkbox" className="custom-control-input" id="price-1"/>
                                    <label className="custom-control-label" for="price-1">$0 - $20</label>
                                    <span className="badge border font-weight-normal">15</span>
                                </div>
                                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                                    <input type="checkbox" className="custom-control-input" id="price-2"/>
                                    <label className="custom-control-label" for="price-2">$20 - $40</label>
                                    <span className="badge border font-weight-normal">10</span>
                                </div>
                                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                                    <input type="checkbox" className="custom-control-input" id="price-3"/>
                                    <label className="custom-control-label" for="price-3">$40 - $60</label>
                                    <span className="badge border font-weight-normal">4</span>
                                </div>
                                
                            </form>
                        </div>
                        <div className="border-bottom mb-4 pb-4">
                            <h5 className="font-weight-semi-bold mb-4">Filter by Category</h5>
                            <form>
                                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                                    <input type="checkbox" className="custom-control-input" checked id="color-all"/>
                                    <label className="custom-control-label" for="price-all">All</label>
                                    <span className="badge border font-weight-normal">100</span>
                                </div>
                                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                                    <input type="checkbox" className="custom-control-input" id="color-1"/>
                                    <label className="custom-control-label" for="color-1">Creals</label>
                                    <span className="badge border font-weight-normal">15</span>
                                </div>
                                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                                    <input type="checkbox" className="custom-control-input" id="color-2"/>
                                    <label className="custom-control-label" for="color-2">Dairy</label>
                                    <span className="badge border font-weight-normal">9</span>
                                </div>
                                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                                    <input type="checkbox" className="custom-control-input" id="color-3"/>
                                    <label className="custom-control-label" for="color-3">Masalas</label>
                                    <span className="badge border font-weight-normal">24</span>
                                </div>
                                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                                    <input type="checkbox" className="custom-control-input" id="color-4"/>
                                    <label className="custom-control-label" for="color-4">Snacks</label>
                                    <span className="badge border font-weight-normal">14</span>
                                </div>
                                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between">
                                    <input type="checkbox" className="custom-control-input" id="color-5"/>
                                    <label className="custom-control-label" for="color-5">Spices</label>
                                    <span className="badge border font-weight-normal">6</span>
                                </div>
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
                            <div className="col-lg-4 col-md-6 col-sm-12 pb-1">
                                <div className="card product-item border-0 mb-4">
                                    <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                                        <img className="img-fluid w-100" src="/assets/assets/images/chillipowder.jpg" alt=""/>
                                    </div>
                                    <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
                                        <h6 className="text-truncate mb-3">Chilli Powder</h6>
                                        <div className="d-flex justify-content-center">
                                            <h6>$12.00</h6><h6 className="text-muted ml-2"><del>$23.00</del></h6>
                                        </div>
                                    </div>
                                    <div className="card-footer d-flex justify-content-between bg-light border">
                                        <a href="" className="btn btn-sm text-dark p-0"><i className="fas fa-eye text-primary mr-1"></i>View Detail</a>
                                        <a href="" className="btn btn-sm text-dark p-0"><i className="fas fa-shopping-cart text-primary mr-1"></i>Add To Cart</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-12 pb-1">
                                <div className="card product-item border-0 mb-4">
                                    <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                                        <img className="img-fluid w-100" src="/assets/assets/images/coriander.jpg" alt=""/>
                                    </div>
                                    <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
                                        <h6 className="text-truncate mb-3">Coriander</h6>
                                        <div className="d-flex justify-content-center">
                                            <h6>$12.00</h6><h6 className="text-muted ml-2"><del>$13.00</del></h6>
                                        </div>
                                    </div>
                                    <div className="card-footer d-flex justify-content-between bg-light border">
                                        <a href="" className="btn btn-sm text-dark p-0"><i className="fas fa-eye text-primary mr-1"></i>View Detail</a>
                                        <a href="" className="btn btn-sm text-dark p-0"><i className="fas fa-shopping-cart text-primary mr-1"></i>Add To Cart</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-12 pb-1">
                                <div className="card product-item border-0 mb-4">
                                    <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                                        <img className="img-fluid w-100" src="/assets/assets/images/Rice.webp" alt=""/>
                                    </div>
                                    <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
                                        <h6 className="text-truncate mb-3">Rice</h6>
                                        <div className="d-flex justify-content-center">
                                            <h6>$34.99</h6><h6 className="text-muted ml-2"><del>$39.00</del></h6>
                                        </div>
                                    </div>
                                    <div className="card-footer d-flex justify-content-between bg-light border">
                                        <a href="" className="btn btn-sm text-dark p-0"><i className="fas fa-eye text-primary mr-1"></i>View Detail</a>
                                        <a href="" className="btn btn-sm text-dark p-0"><i className="fas fa-shopping-cart text-primary mr-1"></i>Add To Cart</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-12 pb-1">
                                <div className="card product-item border-0 mb-4">
                                    <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                                        <img className="img-fluid w-100" src="/assets/assets/images/paneer.webp" alt=""/>
                                    </div>
                                    <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
                                        <h6 className="text-truncate mb-3">Paneer</h6>
                                        <div className="d-flex justify-content-center">
                                            <h6>$6.00</h6><h6 className="text-muted ml-2"><del>$12.00</del></h6>
                                        </div>
                                    </div>
                                    <div className="card-footer d-flex justify-content-between bg-light border">
                                        <a href="" className="btn btn-sm text-dark p-0"><i className="fas fa-eye text-primary mr-1"></i>View Detail</a>
                                        <a href="" className="btn btn-sm text-dark p-0"><i className="fas fa-shopping-cart text-primary mr-1"></i>Add To Cart</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-12 pb-1">
                                <div className="card product-item border-0 mb-4">
                                    <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                                        <img className="img-fluid w-100" src="/assets/assets/images/chickenmasala.jpg" alt=""/>
                                    </div>
                                    <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
                                        <h6 className="text-truncate mb-3">Chickem Masala</h6>
                                        <div className="d-flex justify-content-center">
                                            <h6>$5.49</h6><h6 className="text-muted ml-2"><del>$12.00</del></h6>
                                        </div>
                                    </div>
                                    <div className="card-footer d-flex justify-content-between bg-light border">
                                        <a href="" className="btn btn-sm text-dark p-0"><i className="fas fa-eye text-primary mr-1"></i>View Detail</a>
                                        <a href="" className="btn btn-sm text-dark p-0"><i className="fas fa-shopping-cart text-primary mr-1"></i>Add To Cart</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-12 pb-1">
                                <div className="card product-item border-0 mb-4">
                                    <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                                        <img className="img-fluid w-100" src="/assets/assets/images/moondal.jpg" alt=""/>
                                    </div>
                                    <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
                                        <h6 className="text-truncate mb-3">Haldigram MoonDal</h6>
                                        <div className="d-flex justify-content-center">
                                            <h6>$5.65</h6><h6 className="text-muted ml-2"><del>$7.00</del></h6>
                                        </div>
                                    </div>
                                    <div className="card-footer d-flex justify-content-between bg-light border">
                                        <a href="" className="btn btn-sm text-dark p-0"><i className="fas fa-eye text-primary mr-1"></i>View Detail</a>
                                        <a href="" className="btn btn-sm text-dark p-0"><i className="fas fa-shopping-cart text-primary mr-1"></i>Add To Cart</a>
                                    </div>
                                </div>
                            </div>
                            </>
                            }
                        
                        </div>
                            <div className="col-12 pb-1">
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
                            </div>
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
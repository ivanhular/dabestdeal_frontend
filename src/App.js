import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container, Image } from 'react-bootstrap'
// import load from './utils'
import Loader from './assets/Loader.gif'
import ScrollToTop from './components/ScrollToTop'

const load = (Component) => (props) => {
  return (
    <Suspense
      fallback={
        <div className='loader'>
          <Image className='loader__icon' src={Loader} />
        </div>
      }
    >
      <Component {...props} />
    </Suspense>
  )
}

const Header = lazy(() => import('./components/Header'))
const Footer = lazy(() => import('./components/Footer'))
const HomeScreen = load(lazy(() => import('./screens/HomeScreen')))
const ProductScreen = load(lazy(() => import('./screens/ProductScreen')))
const CartScreen = load(lazy(() => import('./screens/CartScreen')))
const LoginScreen = load(lazy(() => import('./screens/LoginScreen')))
const RegisterScreen = load(lazy(() => import('./screens/RegisterScreen')))
const ProfileScreen = load(lazy(() => import('./screens/ProfileScreen')))
const ShippingScreen = load(lazy(() => import('./screens/ShippingScreen')))
const PaymentScreen = load(lazy(() => import('./screens/PaymentScreen')))
const PlaceOrderScreen = load(lazy(() => import('./screens/PlaceOrderScreen')))
const OrderScreen = load(lazy(() => import('./screens/OrderScreen')))
const UserListScreen = load(lazy(() => import('./screens/UserListScreen')))
const UserEditScreen = load(lazy(() => import('./screens/UserEditScreen')))
const ProductListScreen = load(
  lazy(() => import('./screens/ProductListScreen'))
)
const ProductEditScreen = load(
  lazy(() => import('./screens/ProductEditScreen'))
)
const OrderListScreen = load(lazy(() => import('./screens/OrderListScreen')))
const PrivacyScreen = load(lazy(() => import('./screens/PrivacyScreen')))
const HelpScreen = load(lazy(() => import('./screens/HelpScreen')))
// import TestScreen from './screens/TestScreen'

const App = () => {
  return (
    <Router>
      <Suspense fallback=''>
        <Header />
      </Suspense>
      <main className='main-wrap py-3'>
        <Container>
          <ScrollToTop />
          <Route path='/privacy-policy' component={PrivacyScreen} />
          <Route path='/help' component={HelpScreen} />
          <Route path='/order/:id' component={OrderScreen} />
          <Route path='/shipping' component={ShippingScreen} />
          <Route path='/payment' component={PaymentScreen} />
          <Route path='/placeorder' component={PlaceOrderScreen} />
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/product/:id' component={ProductScreen} />
          <Route path='/cart/:id?' component={CartScreen} />
          <Route path='/admin/userlist' component={UserListScreen} />
          <Route path='/admin/user/:id/edit' component={UserEditScreen} />
          <Route
            path='/admin/productlist'
            component={ProductListScreen}
            exact
          />
          <Route
            path='/admin/productlist/:pageNumber'
            component={ProductListScreen}
            exact
          />
          <Route path='/admin/product/:id/edit' component={ProductEditScreen} />
          <Route path='/admin/orderlist' component={OrderListScreen} />
          <Route path='/search/:keyword' component={HomeScreen} exact />
          <Route path='/page/:pageNumber' component={HomeScreen} exact />
          <Route
            path='/search/:keyword/page/:pageNumber'
            component={HomeScreen}
            exact
          />
          <Route path='/' component={HomeScreen} exact />
        </Container>
      </main>
      <Suspense fallback=''>
        <Footer />
      </Suspense>
    </Router>
  )
}

export default App

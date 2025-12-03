import { selectUser, selectIsAuthChecked } from '../../slices/userSlice';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { useNavigate } from 'react-router';
import { checkUserAuth } from '../../slices/userSlice';
import { clearOrder } from '../../slices/orderSlice';
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation
} from 'react-router-dom';
import { AppHeader } from '../app-header';
import { Modal } from '../modal';
import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import { OrderInfo } from '../order-info';
import { IngredientDetails } from '../ingredient-details';
import styles from './app.module.css';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const user = useAppSelector(selectUser);
  const isAuthChecked = useAppSelector(selectIsAuthChecked);
  const location = useLocation();

  if (!isAuthChecked) {
    return null;
  }

  return user ? (
    children
  ) : (
    <Navigate to='/login' state={{ from: location }} replace />
  );
};

const ProtectedAuthRoute = ({ children }: { children: JSX.Element }) => {
  const user = useAppSelector(selectUser);
  const isAuthChecked = useAppSelector(selectIsAuthChecked);
  const location = useLocation();

  if (!isAuthChecked) {
    return null;
  }

  return !user ? children : <Navigate to='/' replace />;
};

const IngredientModalWrapper = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/');
  };

  return (
    <Modal title='' onClose={handleClose}>
      <IngredientDetails />
    </Modal>
  );
};

const OrderModalWrapper = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleClose = () => {
    dispatch(clearOrder());
    navigate('/feed');
  };
  return (
    <Modal title='' onClose={handleClose}>
      <OrderInfo />
    </Modal>
  );
};

const ProfileOrderModalWrapper = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(clearOrder());
    navigate('/profile/orders');
  };

  return (
    <Modal title='' onClose={handleClose}>
      <OrderInfo />
    </Modal>
  );
};

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkUserAuth());
  }, [dispatch]);

  return (
    <Router>
      <div className={styles.app}>
        <AppHeader />
        <Routes>
          <Route path='/' element={<ConstructorPage />} />
          <Route path='/feed' element={<Feed />} />
          <Route path='/feed/:number' element={<OrderModalWrapper />} />
          <Route path='/ingredients/:id' element={<IngredientModalWrapper />} />

          <Route
            path='/login'
            element={
              <ProtectedAuthRoute>
                <Login />
              </ProtectedAuthRoute>
            }
          />
          <Route
            path='/register'
            element={
              <ProtectedAuthRoute>
                <Register />
              </ProtectedAuthRoute>
            }
          />
          <Route
            path='/forgot-password'
            element={
              <ProtectedAuthRoute>
                <ForgotPassword />
              </ProtectedAuthRoute>
            }
          />
          <Route
            path='/reset-password'
            element={
              <ProtectedAuthRoute>
                <ResetPassword />
              </ProtectedAuthRoute>
            }
          />

          <Route
            path='/profile/*'
            element={
              <ProtectedRoute>
                <Routes>
                  <Route index element={<Profile />} />
                  <Route path='orders' element={<ProfileOrders />} />
                  <Route
                    path='orders/:number'
                    element={<ProfileOrderModalWrapper />}
                  />
                </Routes>
              </ProtectedRoute>
            }
          />

          <Route path='*' element={<NotFound404 />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

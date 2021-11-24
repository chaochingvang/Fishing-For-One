import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import Nav from '../Nav/Nav';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../User/UserPage/UserPage';
import UserChangeEmail from '../User/UserChangeEmail/UserChangeEmail';
import UserNewPW from '../User/UserNewPW/UserNewPW';
import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import JournalPage from '../Journal/JournalPage/JournalPage';
import JournalDetails from '../Journal/JournalDetails/JournalDetails';
import JournalForm from "../Journal/JournalForm/JournalForm";
import FishPage from '../Fish/FishPage';
import LurePage from '../Lure/LurePage';
import AdminPage from '../Admin/AdminPage/AdminPage';
import AdminFishList from '../Admin/AdminFishList/AdminFishList';
import AdminFishEdit from '../Admin/AdminFishEdit/AdminFishEdit';
import AdminFishForm from '../Admin/AdminFishForm/AdminFishForm';
import AdminLureList from '../Admin/AdminLureList/AdminLureList';
import AdminLureEdit from '../Admin/AdminLureEdit/AdminLureEdit';
import AdminLureForm from '../Admin/AdminLureForm/AdminLureForm';
import BottomNav from '../BottomNav/BottomNav';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css';


function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
    dispatch({ type: 'FETCH_FISH' });
    dispatch({ type: `FETCH_LURE` });
    dispatch({ type: `FETCH_JOURNAL` });
  }, [dispatch]);

  return (
    <Router>
      <div>
        {/* <Nav /> */}
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/login */}
          <Redirect exact from="/" to="/login" />

          {/* Visiting localhost:3000/about will show the about page. */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
          >
            <AboutPage />
          </Route>

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          
          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/info"
          >
            <InfoPage />
          </ProtectedRoute>


          {/* //// START USER PAGES //// */}
          <ProtectedRoute
            exact
            path="/user"
          >
            <UserPage />
          </ProtectedRoute>

          <ProtectedRoute
            exact
            path="/user/email"
          >
            <UserChangeEmail />
          </ProtectedRoute>
          
          <ProtectedRoute
            exact
            path="/user/password"
          >
            <UserNewPW />
          </ProtectedRoute>
          {/* //// END USER PAGES //// */}


          {/* //// START ADMIN PAGES //// */}
          <ProtectedRoute
            exact
            path="/admin"
          >
            {(user.access_level !== 0) ?
              <Redirect to="/403" />
              :
              <AdminPage />
            }
          </ProtectedRoute>

          <ProtectedRoute
            exact
            path="/admin/fish"
          >
            {(user.access_level !== 0) ?
              <Redirect to="/403" />
              :
              <AdminFishList />
            }
          </ProtectedRoute>

          <ProtectedRoute
            exact
            path="/admin/fish/edit"
          >
            {(user.access_level !== 0) ?
              <Redirect to="/403" />
              :
              <AdminFishEdit />
            }
          </ProtectedRoute>

          <ProtectedRoute
            exact
            path="/admin/fish/form"
          >
            {(user.access_level !== 0) ?
              <Redirect to="/403" />
              :
              <AdminFishForm />
            }
          </ProtectedRoute>

          <ProtectedRoute
            exact
            path="/admin/lure"
          >
            {(user.access_level !== 0) ?
              <Redirect to="/403" />
              :
              <AdminLureList />
            }
          </ProtectedRoute>

          <ProtectedRoute
            exact
            path="/admin/lure/edit"
          >
            {(user.access_level !== 0) ?
              <Redirect to="/403" />
              :
              <AdminLureEdit />
            }
          </ProtectedRoute>

          <ProtectedRoute
            exact
            path="/admin/lure/form"
          >
            {(user.access_level !== 0) ?
              <Redirect to="/403" />
              :
              <AdminLureForm />
            }
          </ProtectedRoute>
          {/* //// END ADMIN PAGES //// */}


          {/* //// START INFO PAGES //// */}
          <ProtectedRoute
            exact
            path="/fish"
          >
            <FishPage />
          </ProtectedRoute>

          <ProtectedRoute
            exact
            path="/lure"
          >
            <LurePage />
          </ProtectedRoute>
          {/* //// END INFO PAGES //// */}


          {/* //// START JOURNAL PAGES //// */}
          <ProtectedRoute
            exact
            path="/journal"
          >
            <JournalPage />
          </ProtectedRoute>

          <ProtectedRoute
            exact
            path="/journal/form"
          >
            <JournalForm />
          </ProtectedRoute>

          <ProtectedRoute
            exact
            path="/journal/details"
          >
            <JournalDetails />
          </ProtectedRoute>
          {/* //// END JOURNAL PAGES //// */}


          <Route
            exact
            path="/login"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect to the /user page
              <Redirect to="/journal" />
              :
              // Otherwise, show the login page
              <LoginPage />
            }
          </Route>

          <Route
            exact
            path="/registration"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/journal" />
              :
              // Otherwise, show the registration page
              <RegisterPage />
            }
          </Route>
          
          <Route
            exact
            path="/403"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect to the /user page
              <>
                <h1>403 - Forbidden</h1>
                <h2>You do not have access to this page!</h2>
              </>
              :
              // Otherwise, show the login page
              <LoginPage />
            }
          </Route>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404 - Page Does Not Exist</h1>
          </Route>
        </Switch>
        {user.id &&
          <BottomNav />
        }
      </div>
    </Router>
  );
}

export default App;

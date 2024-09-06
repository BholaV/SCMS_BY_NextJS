"use client"
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import type { Navigation, Router } from '@toolpad/core';
import { FaRegUserCircle } from "react-icons/fa";
import { AiOutlineProduct } from "react-icons/ai";
import { RiShutDownLine } from "react-icons/ri";
import { FaUsers } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import SupplierCard from '../supplier/view-accounts/page';
import ProductInventry from '../product/product-view/page';
import SupplierAccCreation from '../supplier/create-account/page';
import ProductStockAlert from '../product/product-alert/page';
import { useRouter  } from 'next/navigation';
import MyOrder from '../order/page';
import Swal from 'sweetalert2';
const NAVIGATION: Navigation = [
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
      segment: 'add-supplier',
      title: 'Add Supplier',
      icon: <FaRegUserCircle className='fs-4'/>,
    },
    {
        segment: 'supplier',
        title: 'Suppliers',
        icon: <FaUsers className='fs-4'/>,
    },
    // {
    //     segment: 'product',
    //     title: 'Product',
    //     icon: <AiOutlineProduct className='fs-4'/>,
    // },
    {
      segment: 'orders',
      title: 'Orders',
      icon: <ShoppingCartIcon />,
    },
    {
        segment: 'notification',
        title: 'Notification',
        icon: <IoIosNotifications className='fs-4'/>,
      },
    {
      segment: 'logout',
      title: 'Logout',
      icon: <RiShutDownLine className='fs-4'/>,
    },
];

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});
function DemoPageContent({ pathname }: { pathname: string }) {
  const router = useRouter();

  // Logout function
  const logout = () => {
      Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to logout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, logout',
      cancelButtonText: 'No, Stay here'
    }).then(result=>
      {
      if(result.isConfirmed){
        Swal.fire('Logout successfully', 'Login again.', 'success');
        localStorage.clear(); // Clear local storage on logout
        router.push("/users/sign-in"); // Navigate to the sign-in page
      }
    }).catch(err=>{
      Swal.fire('Error', 'Failed to logout.', 'error');
    });
  };
  
  // Render logic
  return (
    <>
      {pathname === '/supplier' ? (
        <SupplierCard />
      ) : pathname === '/dashboard' ? (
        <ProductInventry />
      ) : pathname === '/add-supplier' ? (
        <SupplierAccCreation />
      ) : pathname === '/notification' ? (
        <ProductStockAlert />
      ) : pathname === '/orders' ? (
        <MyOrder />
      ) : pathname === '/logout' ? (
        // Trigger logout only if pathname matches '/logout'
        <>
          {logout()}
        </>
      ) : (
        'Hello'
      )}
    </>
  );
}

interface DemoProps {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window?: () => Window;
}

export default function DashboardLayoutBranding(props: DemoProps) {
  const { window } = props;

  const [pathname, setPathname] = React.useState('/dashboard');

  const router = React.useMemo<Router>(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  // Remove this const when copying and pasting into your project.
  const demoWindow = window !== undefined ? window() : undefined;

  return (
    // preview-start
    <AppProvider
      navigation={NAVIGATION}
      branding={{
        logo: <img src="https://cdn.prod.website-files.com/5a1eb87c9afe1000014a4c7d/5dc3e6ddb0a692b0a662f1ca_9DO3Z3KeB-C7oGcfwKGuVEszEmH1_QJJjerK75gBAv4XPtlr0_evZny_QntIxCTJGawsQjvOFc62bbY9ZW0GzSdxRDm8sUDQvJ5kzdzQkruUNUrod3zw8STOf_XZYMzvxI2YisE.png" alt="MUI logo" />,
        title: 'SCMS',
      }}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout>
        <DemoPageContent pathname={pathname} />
      </DashboardLayout>
    </AppProvider>
    // preview-end
  );
}
import { Disclosure } from "@headlessui/react";
import {
  Bars3Icon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../Context";
import axios from "axios";

const Navbar = () => {
  const state = useContext(Context);
  const [isAdmin, setisAdmin] = state.UserApi.isAdmin;
  const [isLogged, setisLogged] = state.UserApi.isLogged;
  const [cart,setCart] = state.UserApi.cart

  const logoutUser = async () => {
    await axios.get("http://localhost:5000/user/logout");
    localStorage.clear();
    setisAdmin(false);
    setisLogged(false);
  };

  const adminNav = () => {
    return (
      <>
        <p className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-900 hover:border-gray-300 hover:text-gray-700">
          <NavLink to="/create_product">Create Product</NavLink>
        </p>
        <p className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-900 hover:border-gray-300 hover:text-gray-700">
          <NavLink to="/category">Categories</NavLink>
        </p>
      </>
    );
  };

  const adminNavHidden = () => {
    return (
      <>
        <Disclosure.Button
          as="p"
          className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
        >
          <NavLink to="/create_product">Create Product</NavLink>
        </Disclosure.Button>
        <Disclosure.Button
          as="p"
          className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
        >
          <NavLink to="/category">Categories</NavLink>
        </Disclosure.Button>
      </>
    );
  };

  const loggedNav = () => {
    return (
      <>
        <p className="inline-flex items-center border-b-2 border-transparent px-3 pt-1 text-sm font-medium text-gray-900 hover:border-gray-300 hover:text-gray-700">
          <NavLink to="/history">History</NavLink>
        </p>
        <NavLink to="/" onClick={logoutUser}>
          <button
            type="button"
            className="inline-flex items-center rounded-md border border-transparent bg-indigo-100 px-3 py-2 text-sm font-medium leading-4 text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            LogOut
          </button>
          </NavLink>
      </>
    );
  };

  return (
    <>
      <Disclosure as="nav" className="bg-white shadow">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex flex-shrink-0 items-center">
                    <img
                      className="block h-8 w-auto lg:hidden"
                      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                      alt="Your Company"
                    />
                    <img
                      className="hidden h-8 w-auto lg:block"
                      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                      alt="Your Company"
                    />
                  </div>
                  <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                    {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                    <p className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-900 hover:border-gray-300 hover:text-gray-700">
                      <NavLink to="/">{isAdmin ? "Products" : "Store"}</NavLink>
                    </p>
                    {isAdmin && adminNav()}
                    {/* <a
                    href ="/"
                    className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  >
                    Team
                  </a> */}
                  </div>
                </div>
                <div className="flex flex-1 items-center justify-end">
                  {/* Cart */}
                  {isAdmin ? '' : <div className="ml-4 flow-root lg:ml-8">
                    <p className="group -m-2 flex items-center p-2">
                      <NavLink to="/cart" as={NavLink}>
                        <ShoppingBagIcon
                          className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                          aria-hidden="true"
                        ></ShoppingBagIcon>
                      </NavLink>
                      <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                        {cart.length}
                      </span>
                      <span className="sr-only">items in cart, view bag</span>
                    </p>
                  </div>}
                  <div className="p-2">
                    <span className="sr-only">Login</span>
                    {isLogged ? loggedNav() : <NavLink to="/login">
                      <button
                        type="button"
                        className="inline-flex items-center rounded-md border border-transparent bg-indigo-100 px-3 py-2 text-sm font-medium leading-4 text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Login
                      </button>
                    </NavLink>}
                  </div>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 pt-2 pb-4">
                {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
                <Disclosure.Button
                  as="p"
                  className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
                >
                  <NavLink to="/" as={NavLink}>
                    {isAdmin ? "Products" : "Store"}
                  </NavLink>
                </Disclosure.Button>
                {isAdmin && adminNavHidden()}
                {/* <Disclosure.Button
                as="a"
                href ="/"
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
              >
                Team
              </Disclosure.Button> */}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
};

export default Navbar;

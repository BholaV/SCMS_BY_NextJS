"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/dashboard/page",{

/***/ "(app-pages-browser)/./src/app/product/page.tsx":
/*!**********************************!*\
  !*** ./src/app/product/page.tsx ***!
  \**********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! axios */ \"(app-pages-browser)/./node_modules/axios/lib/axios.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _barrel_optimize_names_FaRupeeSign_react_icons_fa__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! __barrel_optimize__?names=FaRupeeSign!=!react-icons/fa */ \"(app-pages-browser)/./node_modules/react-icons/fa/index.mjs\");\n/* harmony import */ var _page_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./page.css */ \"(app-pages-browser)/./src/app/product/page.css\");\n/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! sweetalert2 */ \"(app-pages-browser)/./node_modules/sweetalert2/dist/sweetalert2.all.js\");\n/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var bootstrap_dist_css_bootstrap_min_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! bootstrap/dist/css/bootstrap.min.css */ \"(app-pages-browser)/./node_modules/bootstrap/dist/css/bootstrap.min.css\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\n\n\n\nfunction ProductInventry() {\n    _s();\n    const [productList, setProductList] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);\n    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);\n    // Fetch products when the component mounts\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        try {\n            axios__WEBPACK_IMPORTED_MODULE_5__[\"default\"].get(\"\".concat(\"http://localhost:3002/product/view-all-products\")).then((result)=>{\n                console.log(result.data.result);\n                setProductList(result.data.result);\n            }).catch((err)=>{\n                console.log(err);\n            });\n        } catch (error) {\n            console.error(\"Error fetching products:\", error);\n            sweetalert2__WEBPACK_IMPORTED_MODULE_3___default().fire({\n                title: \"Error!\",\n                text: \"There was an error fetching products\",\n                icon: \"error\"\n            });\n        } finally{\n            setLoading(false);\n        }\n    }, []);\n    // Function to change the main product image when a thumbnail is clicked\n    const changeImg = (productImg, index)=>{\n        const thumbnail = document.getElementById(\"thumbnail-\".concat(index));\n        if (thumbnail) {\n            thumbnail.src = productImg;\n        }\n    };\n    // Function to handle order creation\n    const createOrder = async (product)=>{\n        const userString = localStorage.getItem(\"user\");\n        let userId = null;\n        const user = JSON.parse(userString);\n        userId = user._id;\n        if (userId) {\n            const productId = product._id; // Get product ID\n            sweetalert2__WEBPACK_IMPORTED_MODULE_3___default().fire({\n                title: \"Are you sure?\",\n                text: \"Do you want to create an order for \".concat(product.title, \"?\"),\n                icon: \"question\",\n                showCancelButton: true,\n                confirmButtonText: \"Yes, create order\",\n                cancelButtonText: \"No, cancel\"\n            }).then(async (result)=>{\n                if (result.isConfirmed) {\n                    try {\n                        // Check stock availability\n                        const stockResponse = await axios__WEBPACK_IMPORTED_MODULE_5__[\"default\"].get(\"\".concat(\"http://localhost:3002/product/view-all-products\", \"/\").concat(productId));\n                        const { stockAvailable } = stockResponse.data;\n                        if (stockAvailable) {\n                            // Create the order\n                            await axios__WEBPACK_IMPORTED_MODULE_5__[\"default\"].post(\"\".concat(\"http://localhost:3002/order/create-order\"), {\n                                userId,\n                                productId\n                            });\n                            // Remove stock after the order is created\n                            await axios__WEBPACK_IMPORTED_MODULE_5__[\"default\"].delete(\"\".concat(\"http://localhost:3002/product/removeStock\", \"/\").concat(productId));\n                            sweetalert2__WEBPACK_IMPORTED_MODULE_3___default().fire({\n                                title: \"Order created!\",\n                                text: \"Your order has been created successfully\",\n                                icon: \"success\"\n                            });\n                        } else {\n                            // Notify the user if the product is out of stock\n                            sweetalert2__WEBPACK_IMPORTED_MODULE_3___default().fire({\n                                title: \"Out of Stock!\",\n                                text: \"Sorry, this product is out of stock.\",\n                                icon: \"error\"\n                            });\n                        }\n                    } catch (err) {\n                        console.error(\"Error handling order:\", err);\n                        sweetalert2__WEBPACK_IMPORTED_MODULE_3___default().fire({\n                            title: \"Error!\",\n                            text: \"There was an error processing your order\",\n                            icon: \"error\"\n                        });\n                    }\n                }\n            });\n        } else {\n            sweetalert2__WEBPACK_IMPORTED_MODULE_3___default().fire({\n                title: \"Error!\",\n                text: \"User is not logged in\",\n                icon: \"error\"\n            });\n        }\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: !loading ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"section\", {\n            id: \"product-inventry-parent\",\n            children: productList === null || productList === void 0 ? void 0 : productList.map((data, index)=>{\n                var _data_images, _data_title;\n                return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    id: \"product-invt\",\n                    className: \"border\",\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            className: \"d-flex justify-content-center align-items-center w-100 m-2\",\n                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"img\", {\n                                src: data.thumbnail,\n                                width: \"250px\",\n                                height: \"250px\",\n                                id: \"thumbnail-\".concat(index)\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\bhola.vishwakarma\\\\Documents\\\\Project\\\\NEXT_JS\\\\first-next-app\\\\src\\\\app\\\\product\\\\page.tsx\",\n                                lineNumber: 128,\n                                columnNumber: 15\n                            }, this)\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\bhola.vishwakarma\\\\Documents\\\\Project\\\\NEXT_JS\\\\first-next-app\\\\src\\\\app\\\\product\\\\page.tsx\",\n                            lineNumber: 127,\n                            columnNumber: 15\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            className: \"d-flex w-100 justify-content-center p-2\",\n                            children: (_data_images = data.images) === null || _data_images === void 0 ? void 0 : _data_images.map((productImg, ind)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                    className: \"border rounded ms-4\",\n                                    style: {\n                                        cursor: \"pointer\"\n                                    },\n                                    onClick: ()=>changeImg(productImg, index),\n                                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"img\", {\n                                        src: productImg,\n                                        alt: \"image\",\n                                        style: {\n                                            width: \"50px\",\n                                            height: \"50px\"\n                                        }\n                                    }, void 0, false, {\n                                        fileName: \"C:\\\\Users\\\\bhola.vishwakarma\\\\Documents\\\\Project\\\\NEXT_JS\\\\first-next-app\\\\src\\\\app\\\\product\\\\page.tsx\",\n                                        lineNumber: 135,\n                                        columnNumber: 21\n                                    }, this)\n                                }, ind, false, {\n                                    fileName: \"C:\\\\Users\\\\bhola.vishwakarma\\\\Documents\\\\Project\\\\NEXT_JS\\\\first-next-app\\\\src\\\\app\\\\product\\\\page.tsx\",\n                                    lineNumber: 134,\n                                    columnNumber: 19\n                                }, this))\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\bhola.vishwakarma\\\\Documents\\\\Project\\\\NEXT_JS\\\\first-next-app\\\\src\\\\app\\\\product\\\\page.tsx\",\n                            lineNumber: 132,\n                            columnNumber: 15\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h6\", {\n                            className: \"text-center fw-bold\",\n                            children: (_data_title = data.title) === null || _data_title === void 0 ? void 0 : _data_title.slice(0, 25)\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\bhola.vishwakarma\\\\Documents\\\\Project\\\\NEXT_JS\\\\first-next-app\\\\src\\\\app\\\\product\\\\page.tsx\",\n                            lineNumber: 141,\n                            columnNumber: 15\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                            className: \"text-center text-success fs-6 m-1\",\n                            children: [\n                                \"Category : \",\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"b\", {\n                                    className: \"fw-bold\",\n                                    children: data.categoryName\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\Users\\\\bhola.vishwakarma\\\\Documents\\\\Project\\\\NEXT_JS\\\\first-next-app\\\\src\\\\app\\\\product\\\\page.tsx\",\n                                    lineNumber: 144,\n                                    columnNumber: 28\n                                }, this)\n                            ]\n                        }, void 0, true, {\n                            fileName: \"C:\\\\Users\\\\bhola.vishwakarma\\\\Documents\\\\Project\\\\NEXT_JS\\\\first-next-app\\\\src\\\\app\\\\product\\\\page.tsx\",\n                            lineNumber: 143,\n                            columnNumber: 15\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            className: \"text-center\",\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h6\", {\n                                    id: \"price\",\n                                    className: \"d-inline p-1\",\n                                    children: [\n                                        \"Price: \",\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"b\", {\n                                            children: (data.price * 10).toFixed(2)\n                                        }, void 0, false, {\n                                            fileName: \"C:\\\\Users\\\\bhola.vishwakarma\\\\Documents\\\\Project\\\\NEXT_JS\\\\first-next-app\\\\src\\\\app\\\\product\\\\page.tsx\",\n                                            lineNumber: 149,\n                                            columnNumber: 24\n                                        }, this),\n                                        \" \",\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_FaRupeeSign_react_icons_fa__WEBPACK_IMPORTED_MODULE_6__.FaRupeeSign, {}, void 0, false, {\n                                            fileName: \"C:\\\\Users\\\\bhola.vishwakarma\\\\Documents\\\\Project\\\\NEXT_JS\\\\first-next-app\\\\src\\\\app\\\\product\\\\page.tsx\",\n                                            lineNumber: 149,\n                                            columnNumber: 62\n                                        }, this)\n                                    ]\n                                }, void 0, true, {\n                                    fileName: \"C:\\\\Users\\\\bhola.vishwakarma\\\\Documents\\\\Project\\\\NEXT_JS\\\\first-next-app\\\\src\\\\app\\\\product\\\\page.tsx\",\n                                    lineNumber: 148,\n                                    columnNumber: 15\n                                }, this),\n                                \"\\xa0\\xa0\\xa0\"\n                            ]\n                        }, void 0, true, {\n                            fileName: \"C:\\\\Users\\\\bhola.vishwakarma\\\\Documents\\\\Project\\\\NEXT_JS\\\\first-next-app\\\\src\\\\app\\\\product\\\\page.tsx\",\n                            lineNumber: 147,\n                            columnNumber: 15\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                            className: \"text-center m-0\",\n                            children: [\n                                data.discountPercentage,\n                                \"% Off\"\n                            ]\n                        }, void 0, true, {\n                            fileName: \"C:\\\\Users\\\\bhola.vishwakarma\\\\Documents\\\\Project\\\\NEXT_JS\\\\first-next-app\\\\src\\\\app\\\\product\\\\page.tsx\",\n                            lineNumber: 152,\n                            columnNumber: 15\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"center\", {\n                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                className: \"m-1 btn btn-primary center w-75\",\n                                onClick: ()=>createOrder(data),\n                                children: \"Order\"\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\bhola.vishwakarma\\\\Documents\\\\Project\\\\NEXT_JS\\\\first-next-app\\\\src\\\\app\\\\product\\\\page.tsx\",\n                                lineNumber: 156,\n                                columnNumber: 17\n                            }, this)\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\bhola.vishwakarma\\\\Documents\\\\Project\\\\NEXT_JS\\\\first-next-app\\\\src\\\\app\\\\product\\\\page.tsx\",\n                            lineNumber: 155,\n                            columnNumber: 15\n                        }, this)\n                    ]\n                }, data._id, true, {\n                    fileName: \"C:\\\\Users\\\\bhola.vishwakarma\\\\Documents\\\\Project\\\\NEXT_JS\\\\first-next-app\\\\src\\\\app\\\\product\\\\page.tsx\",\n                    lineNumber: 125,\n                    columnNumber: 13\n                }, this);\n            })\n        }, void 0, false, {\n            fileName: \"C:\\\\Users\\\\bhola.vishwakarma\\\\Documents\\\\Project\\\\NEXT_JS\\\\first-next-app\\\\src\\\\app\\\\product\\\\page.tsx\",\n            lineNumber: 123,\n            columnNumber: 9\n        }, this) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h2\", {\n                children: \"Loading...\"\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\bhola.vishwakarma\\\\Documents\\\\Project\\\\NEXT_JS\\\\first-next-app\\\\src\\\\app\\\\product\\\\page.tsx\",\n                lineNumber: 163,\n                columnNumber: 11\n            }, this)\n        }, void 0, false, {\n            fileName: \"C:\\\\Users\\\\bhola.vishwakarma\\\\Documents\\\\Project\\\\NEXT_JS\\\\first-next-app\\\\src\\\\app\\\\product\\\\page.tsx\",\n            lineNumber: 162,\n            columnNumber: 9\n        }, this)\n    }, void 0, false);\n}\n_s(ProductInventry, \"X3n1gIA8MetBioVoUhFv0BX9Bjk=\");\n_c = ProductInventry;\n/* harmony default export */ __webpack_exports__[\"default\"] = (ProductInventry);\nvar _c;\n$RefreshReg$(_c, \"ProductInventry\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvcHJvZHVjdC9wYWdlLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFDMEI7QUFDa0I7QUFDQztBQUN6QjtBQUNXO0FBQ2U7QUFnQjlDLFNBQVNLOztJQUNQLE1BQU0sQ0FBQ0MsYUFBYUMsZUFBZSxHQUFHTCwrQ0FBUUEsQ0FBWSxFQUFFO0lBQzVELE1BQU0sQ0FBQ00sU0FBU0MsV0FBVyxHQUFHUCwrQ0FBUUEsQ0FBVTtJQUVoRCwyQ0FBMkM7SUFDM0NELGdEQUFTQSxDQUFDO1FBQ04sSUFBSTtZQUVGRCw2Q0FBS0EsQ0FBQ1UsR0FBRyxDQUFDLEdBQTRDLE9BQXpDQyxpREFBd0MsR0FBSUcsSUFBSSxDQUFDQyxDQUFBQTtnQkFDMURDLFFBQVFDLEdBQUcsQ0FBQ0YsT0FBT0csSUFBSSxDQUFDSCxNQUFNO2dCQUM5QlIsZUFBZVEsT0FBT0csSUFBSSxDQUFDSCxNQUFNO1lBQ3JDLEdBQUdJLEtBQUssQ0FBQ0MsQ0FBQUE7Z0JBQ0xKLFFBQVFDLEdBQUcsQ0FBQ0c7WUFDaEI7UUFDRixFQUFFLE9BQU9DLE9BQU87WUFDZEwsUUFBUUssS0FBSyxDQUFDLDRCQUE0QkE7WUFDMUNqQix1REFBUyxDQUFDO2dCQUNSbUIsT0FBTztnQkFDUEMsTUFBTTtnQkFDTkMsTUFBTTtZQUNSO1FBQ0YsU0FBVTtZQUNSaEIsV0FBVztRQUNiO0lBQ0YsR0FBRSxFQUFFO0lBRU4sd0VBQXdFO0lBQ3hFLE1BQU1pQixZQUFZLENBQUNDLFlBQW9CQztRQUNyQyxNQUFNQyxZQUFZQyxTQUFTQyxjQUFjLENBQUMsYUFBbUIsT0FBTkg7UUFDdkQsSUFBSUMsV0FBVztZQUNiQSxVQUFVRyxHQUFHLEdBQUdMO1FBQ2xCO0lBQ0Y7SUFFQSxvQ0FBb0M7SUFDcEMsTUFBTU0sY0FBYyxPQUFPQztRQUN6QixNQUFNQyxhQUFpQkMsYUFBYUMsT0FBTyxDQUFDO1FBQzVDLElBQUlDLFNBQXFCO1FBQ3pCLE1BQU1DLE9BQWFDLEtBQUtDLEtB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Ozs4Q0FDZiw4REFBQ1U7b0NBQUdiLElBQUc7b0NBQVFHLFdBQVU7O3dDQUFlO3NEQUMvQiw4REFBQ2E7c0RBQUcsQ0FBQ3JELEtBQUt1RCxLQUFLLEdBQUcsRUFBQyxFQUFHQyxPQUFPLENBQUM7Ozs7Ozt3Q0FBTztzREFBQyw4REFBQ3ZFLDBGQUFXQTs7Ozs7Ozs7Ozs7Z0NBQ3REOzs7Ozs7O3NDQUVMLDhEQUFDbUU7NEJBQUVaLFdBQVU7O2dDQUFtQnhDLEtBQUt5RCxrQkFBa0I7Z0NBQUM7Ozs7Ozs7c0NBR3hELDhEQUFDQztzQ0FDQyw0RUFBQ0M7Z0NBQU9uQixXQUFVO2dDQUFrQ1EsU0FBUyxJQUFNakMsWUFBWWY7MENBQU87Ozs7Ozs7Ozs7OzttQkEvQjNDQSxLQUFLd0IsR0FBRzs7Ozs7Ozs7OztpQ0FxQzNELDhEQUFDZTtzQkFDQyw0RUFBQ3FCOzBCQUFHOzs7Ozs7Ozs7Ozs7QUFLZDtHQWpKU3pFO0tBQUFBO0FBbUpULCtEQUFlQSxlQUFlQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9hcHAvcHJvZHVjdC9wYWdlLnRzeD9iODRhIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIGNsaWVudFwiXHJcbmltcG9ydCBheGlvcyBmcm9tICdheGlvcyc7XHJcbmltcG9ydCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IEZhUnVwZWVTaWduIH0gZnJvbSAncmVhY3QtaWNvbnMvZmEnO1xyXG5pbXBvcnQgJy4vcGFnZS5jc3MnO1xyXG5pbXBvcnQgU3dhbCBmcm9tICdzd2VldGFsZXJ0Mic7XHJcbmltcG9ydCAnYm9vdHN0cmFwL2Rpc3QvY3NzL2Jvb3RzdHJhcC5taW4uY3NzJztcclxuLy8gRGVmaW5lIFR5cGVTY3JpcHQgaW50ZXJmYWNlcyBmb3IgcHJvZHVjdCBkYXRhXHJcbmludGVyZmFjZSBQcm9kdWN0IHtcclxuICBfaWQ6IHN0cmluZztcclxuICB0aXRsZTogc3RyaW5nO1xyXG4gIGNhdGVnb3J5TmFtZTogc3RyaW5nO1xyXG4gIHByaWNlOiBudW1iZXI7XHJcbiAgZGlzY291bnRQZXJjZW50YWdlOiBudW1iZXI7XHJcbiAgdGh1bWJuYWlsOiBzdHJpbmc7XHJcbiAgaW1hZ2VzOiBzdHJpbmdbXTtcclxufVxyXG5cclxuaW50ZXJmYWNlIFVzZXIge1xyXG4gIF9pZDogc3RyaW5nO1xyXG59XHJcblxyXG5mdW5jdGlvbiBQcm9kdWN0SW52ZW50cnkoKSB7XHJcbiAgY29uc3QgW3Byb2R1Y3RMaXN0LCBzZXRQcm9kdWN0TGlzdF0gPSB1c2VTdGF0ZTxQcm9kdWN0W10+KFtdKTtcclxuICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZTxib29sZWFuPih0cnVlKTtcclxuXHJcbiAgLy8gRmV0Y2ggcHJvZHVjdHMgd2hlbiB0aGUgY29tcG9uZW50IG1vdW50c1xyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICAgIHRyeSB7XHJcblxyXG4gICAgICAgIGF4aW9zLmdldChgJHtwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19QUk9EVUNUX1ZJRVdfQUxMfWApLnRoZW4ocmVzdWx0PT57XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdC5kYXRhLnJlc3VsdClcclxuICAgICAgICAgICAgc2V0UHJvZHVjdExpc3QocmVzdWx0LmRhdGEucmVzdWx0KTtcclxuICAgICAgICB9KS5jYXRjaChlcnI9PntcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBmZXRjaGluZyBwcm9kdWN0czonLCBlcnJvcik7XHJcbiAgICAgICAgU3dhbC5maXJlKHtcclxuICAgICAgICAgIHRpdGxlOiAnRXJyb3IhJyxcclxuICAgICAgICAgIHRleHQ6ICdUaGVyZSB3YXMgYW4gZXJyb3IgZmV0Y2hpbmcgcHJvZHVjdHMnLFxyXG4gICAgICAgICAgaWNvbjogJ2Vycm9yJ1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGZpbmFsbHkge1xyXG4gICAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xyXG4gICAgICB9XHJcbiAgICB9LFtdKTtcclxuXHJcbiAgLy8gRnVuY3Rpb24gdG8gY2hhbmdlIHRoZSBtYWluIHByb2R1Y3QgaW1hZ2Ugd2hlbiBhIHRodW1ibmFpbCBpcyBjbGlja2VkXHJcbiAgY29uc3QgY2hhbmdlSW1nID0gKHByb2R1Y3RJbWc6IHN0cmluZywgaW5kZXg6IG51bWJlcikgPT4ge1xyXG4gICAgY29uc3QgdGh1bWJuYWlsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHRodW1ibmFpbC0ke2luZGV4fWApIGFzIEhUTUxJbWFnZUVsZW1lbnQ7XHJcbiAgICBpZiAodGh1bWJuYWlsKSB7XHJcbiAgICAgIHRodW1ibmFpbC5zcmMgPSBwcm9kdWN0SW1nO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIC8vIEZ1bmN0aW9uIHRvIGhhbmRsZSBvcmRlciBjcmVhdGlvblxyXG4gIGNvbnN0IGNyZWF0ZU9yZGVyID0gYXN5bmMgKHByb2R1Y3Q6IFByb2R1Y3QpID0+IHtcclxuICAgIGNvbnN0IHVzZXJTdHJpbmc6YW55ID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3VzZXInKTtcclxuICAgIGxldCB1c2VySWQ6IGFueSB8IG51bGwgPSBudWxsO1xyXG4gICAgY29uc3QgdXNlcjogVXNlciA9IEpTT04ucGFyc2UodXNlclN0cmluZyk7XHJcbiAgICB1c2VySWQgPSB1c2VyLl9pZDtcclxuICAgIGlmICh1c2VySWQpIHtcclxuICAgICAgY29uc3QgcHJvZHVjdElkID0gcHJvZHVjdC5faWQ7IC8vIEdldCBwcm9kdWN0IElEXHJcblxyXG4gICAgICBTd2FsLmZpcmUoe1xyXG4gICAgICAgIHRpdGxlOiAnQXJlIHlvdSBzdXJlPycsXHJcbiAgICAgICAgdGV4dDogYERvIHlvdSB3YW50IHRvIGNyZWF0ZSBhbiBvcmRlciBmb3IgJHtwcm9kdWN0LnRpdGxlfT9gLFxyXG4gICAgICAgIGljb246ICdxdWVzdGlvbicsXHJcbiAgICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcclxuICAgICAgICBjb25maXJtQnV0dG9uVGV4dDogJ1llcywgY3JlYXRlIG9yZGVyJyxcclxuICAgICAgICBjYW5jZWxCdXR0b25UZXh0OiAnTm8sIGNhbmNlbCdcclxuICAgICAgfSkudGhlbihhc3luYyAocmVzdWx0OmFueSkgPT4ge1xyXG4gICAgICAgIGlmIChyZXN1bHQuaXNDb25maXJtZWQpIHtcclxuICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIC8vIENoZWNrIHN0b2NrIGF2YWlsYWJpbGl0eVxyXG4gICAgICAgICAgICBjb25zdCBzdG9ja1Jlc3BvbnNlID0gYXdhaXQgYXhpb3MuZ2V0KGAke3Byb2Nlc3MuZW52Lk5FWFRfUFVCTElDX1BST0RVQ1RfVklFV19BTEx9LyR7cHJvZHVjdElkfWApO1xyXG4gICAgICAgICAgICBjb25zdCB7IHN0b2NrQXZhaWxhYmxlIH0gPSBzdG9ja1Jlc3BvbnNlLmRhdGE7XHJcblxyXG4gICAgICAgICAgICBpZiAoc3RvY2tBdmFpbGFibGUpIHtcclxuICAgICAgICAgICAgICAvLyBDcmVhdGUgdGhlIG9yZGVyXHJcbiAgICAgICAgICAgICAgYXdhaXQgYXhpb3MucG9zdChgJHtwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19PUkRFUl9DUkVBVEV9YCwgeyB1c2VySWQsIHByb2R1Y3RJZCB9KTtcclxuXHJcbiAgICAgICAgICAgICAgLy8gUmVtb3ZlIHN0b2NrIGFmdGVyIHRoZSBvcmRlciBpcyBjcmVhdGVkXHJcbiAgICAgICAgICAgICAgYXdhaXQgYXhpb3MuZGVsZXRlKGAke3Byb2Nlc3MuZW52Lk5FWFRfUFVCTElDX1BST0RVQ1RfUkVNT1ZFX1NUT0NLfS8ke3Byb2R1Y3RJZH1gKTtcclxuXHJcbiAgICAgICAgICAgICAgU3dhbC5maXJlKHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiAnT3JkZXIgY3JlYXRlZCEnLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogJ1lvdXIgb3JkZXIgaGFzIGJlZW4gY3JlYXRlZCBzdWNjZXNzZnVsbHknLFxyXG4gICAgICAgICAgICAgICAgaWNvbjogJ3N1Y2Nlc3MnXHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgLy8gTm90aWZ5IHRoZSB1c2VyIGlmIHRoZSBwcm9kdWN0IGlzIG91dCBvZiBzdG9ja1xyXG4gICAgICAgICAgICAgIFN3YWwuZmlyZSh7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogJ091dCBvZiBTdG9jayEnLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogJ1NvcnJ5LCB0aGlzIHByb2R1Y3QgaXMgb3V0IG9mIHN0b2NrLicsXHJcbiAgICAgICAgICAgICAgICBpY29uOiAnZXJyb3InXHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBoYW5kbGluZyBvcmRlcjonLCBlcnIpO1xyXG4gICAgICAgICAgICBTd2FsLmZpcmUoe1xyXG4gICAgICAgICAgICAgIHRpdGxlOiAnRXJyb3IhJyxcclxuICAgICAgICAgICAgICB0ZXh0OiAnVGhlcmUgd2FzIGFuIGVycm9yIHByb2Nlc3NpbmcgeW91ciBvcmRlcicsXHJcbiAgICAgICAgICAgICAgaWNvbjogJ2Vycm9yJ1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgU3dhbC5maXJlKHtcclxuICAgICAgICB0aXRsZTogJ0Vycm9yIScsXHJcbiAgICAgICAgdGV4dDogJ1VzZXIgaXMgbm90IGxvZ2dlZCBpbicsXHJcbiAgICAgICAgaWNvbjogJ2Vycm9yJ1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPD5cclxuICAgICAgey8qIE1haW4gc2VjdGlvbiBmb3IgZGlzcGxheWluZyBwcm9kdWN0cyAqL31cclxuICAgICAgeyFsb2FkaW5nID8gKFxyXG4gICAgICAgIDxzZWN0aW9uIGlkPVwicHJvZHVjdC1pbnZlbnRyeS1wYXJlbnRcIj5cclxuICAgICAgICAgIHtwcm9kdWN0TGlzdD8ubWFwKChkYXRhLCBpbmRleCkgPT4gKFxyXG4gICAgICAgICAgICA8ZGl2IGlkPVwicHJvZHVjdC1pbnZ0XCIgY2xhc3NOYW1lPSdib3JkZXInIGtleT17ZGF0YS5faWR9PlxyXG4gICAgICAgICAgICAgIHsvKiBNYWluIHByb2R1Y3QgaW1hZ2UgKi99XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2QtZmxleCBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyIGFsaWduLWl0ZW1zLWNlbnRlciB3LTEwMCBtLTInPlxyXG4gICAgICAgICAgICAgIDxpbWcgc3JjPXtkYXRhLnRodW1ibmFpbH0gd2lkdGg9XCIyNTBweFwiIGhlaWdodD1cIjI1MHB4XCIgaWQ9e2B0aHVtYm5haWwtJHtpbmRleH1gfSAvPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICB7LyogVGh1bWJuYWlscyBmb3IgY2hhbmdpbmcgdGhlIG1haW4gcHJvZHVjdCBpbWFnZSAqL31cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImQtZmxleCB3LTEwMCBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyIHAtMlwiPlxyXG4gICAgICAgICAgICAgICAge2RhdGEuaW1hZ2VzPy5tYXAoKHByb2R1Y3RJbWcsIGluZCkgPT5cclxuICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e2luZH0gY2xhc3NOYW1lPVwiYm9yZGVyIHJvdW5kZWQgbXMtNFwiIHN0eWxlPXt7IGN1cnNvcjogJ3BvaW50ZXInIH19IG9uQ2xpY2s9eygpID0+IGNoYW5nZUltZyhwcm9kdWN0SW1nLCBpbmRleCl9PlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPXtwcm9kdWN0SW1nfSBhbHQ9XCJpbWFnZVwiIHN0eWxlPXt7IHdpZHRoOiAnNTBweCcsIGhlaWdodDogJzUwcHgnIH19IC8+XHJcbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgey8qIFByb2R1Y3QgdGl0bGUgKi99XHJcbiAgICAgICAgICAgICAgPGg2IGNsYXNzTmFtZT0ndGV4dC1jZW50ZXIgZnctYm9sZCc+e2RhdGEudGl0bGU/LnNsaWNlKDAsIDI1KX08L2g2PlxyXG4gICAgICAgICAgICAgIHsvKiBQcm9kdWN0IGNhdGVnb3J5ICovfVxyXG4gICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyIHRleHQtc3VjY2VzcyBmcy02IG0tMVwiPlxyXG4gICAgICAgICAgICAgICAgQ2F0ZWdvcnkgOiA8YiBjbGFzc05hbWU9XCJmdy1ib2xkXCI+e2RhdGEuY2F0ZWdvcnlOYW1lfTwvYj5cclxuICAgICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICAgICAgey8qIFByb2R1Y3QgcHJpY2UgYW5kIGRpc2NvdW50ICovfVxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSd0ZXh0LWNlbnRlcic+XHJcbiAgICAgICAgICAgICAgPGg2IGlkPVwicHJpY2VcIiBjbGFzc05hbWU9J2QtaW5saW5lIHAtMSc+XHJcbiAgICAgICAgICAgICAgICBQcmljZTogPGI+eyhkYXRhLnByaWNlICogMTApLnRvRml4ZWQoMil9PC9iPiA8RmFSdXBlZVNpZ24gLz5cclxuICAgICAgICAgICAgICA8L2g2PiZuYnNwOyZuYnNwOyZuYnNwO1xyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT0ndGV4dC1jZW50ZXIgbS0wJz57ZGF0YS5kaXNjb3VudFBlcmNlbnRhZ2V9JSBPZmY8L3A+XHJcblxyXG4gICAgICAgICAgICAgIHsvKiBCdXR0b24gdG8gY3JlYXRlIGFuIG9yZGVyICovfVxyXG4gICAgICAgICAgICAgIDxjZW50ZXI+XHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cIm0tMSBidG4gYnRuLXByaW1hcnkgY2VudGVyIHctNzVcIiBvbkNsaWNrPXsoKSA9PiBjcmVhdGVPcmRlcihkYXRhKX0+T3JkZXI8L2J1dHRvbj5cclxuICAgICAgICAgICAgICA8L2NlbnRlcj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICApKX1cclxuICAgICAgICA8L3NlY3Rpb24+XHJcbiAgICAgICkgOiAoXHJcbiAgICAgICAgPGRpdj5cclxuICAgICAgICAgIDxoMj5Mb2FkaW5nLi4uPC9oMj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgKX1cclxuICAgIDwvPlxyXG4gICk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFByb2R1Y3RJbnZlbnRyeTtcclxuIl0sIm5hbWVzIjpbImF4aW9zIiwidXNlRWZmZWN0IiwidXNlU3RhdGUiLCJGYVJ1cGVlU2lnbiIsIlN3YWwiLCJQcm9kdWN0SW52ZW50cnkiLCJwcm9kdWN0TGlzdCIsInNldFByb2R1Y3RMaXN0IiwibG9hZGluZyIsInNldExvYWRpbmciLCJnZXQiLCJwcm9jZXNzIiwiZW52IiwiTkVYVF9QVUJMSUNfUFJPRFVDVF9WSUVXX0FMTCIsInRoZW4iLCJyZXN1bHQiLCJjb25zb2xlIiwibG9nIiwiZGF0YSIsImNhdGNoIiwiZXJyIiwiZXJyb3IiLCJmaXJlIiwidGl0bGUiLCJ0ZXh0IiwiaWNvbiIsImNoYW5nZUltZyIsInByb2R1Y3RJbWciLCJpbmRleCIsInRodW1ibmFpbCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJzcmMiLCJjcmVhdGVPcmRlciIsInByb2R1Y3QiLCJ1c2VyU3RyaW5nIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsInVzZXJJZCIsInVzZXIiLCJKU09OIiwicGFyc2UiLCJfaWQiLCJwcm9kdWN0SWQiLCJzaG93Q2FuY2VsQnV0dG9uIiwiY29uZmlybUJ1dHRvblRleHQiLCJjYW5jZWxCdXR0b25UZXh0IiwiaXNDb25maXJtZWQiLCJzdG9ja1Jlc3BvbnNlIiwic3RvY2tBdmFpbGFibGUiLCJwb3N0IiwiTkVYVF9QVUJMSUNfT1JERVJfQ1JFQVRFIiwiZGVsZXRlIiwiTkVYVF9QVUJMSUNfUFJPRFVDVF9SRU1PVkVfU1RPQ0siLCJzZWN0aW9uIiwiaWQiLCJtYXAiLCJkaXYiLCJjbGFzc05hbWUiLCJpbWciLCJ3aWR0aCIsImhlaWdodCIsImltYWdlcyIsImluZCIsInN0eWxlIiwiY3Vyc29yIiwib25DbGljayIsImFsdCIsImg2Iiwic2xpY2UiLCJwIiwiYiIsImNhdGVnb3J5TmFtZSIsInByaWNlIiwidG9GaXhlZCIsImRpc2NvdW50UGVyY2VudGFnZSIsImNlbnRlciIsImJ1dHRvbiIsImgyIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/product/page.tsx\n"));

/***/ })

});
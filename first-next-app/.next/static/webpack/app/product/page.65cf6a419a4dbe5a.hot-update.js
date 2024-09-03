"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/product/page",{

/***/ "(app-pages-browser)/./src/app/product/page.tsx":
/*!**********************************!*\
  !*** ./src/app/product/page.tsx ***!
  \**********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! axios */ \"(app-pages-browser)/./node_modules/axios/lib/axios.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _barrel_optimize_names_FaRupeeSign_react_icons_fa__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! __barrel_optimize__?names=FaRupeeSign!=!react-icons/fa */ \"(app-pages-browser)/./node_modules/react-icons/fa/index.mjs\");\n/* harmony import */ var _page_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./page.css */ \"(app-pages-browser)/./src/app/product/page.css\");\n/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! sweetalert2 */ \"(app-pages-browser)/./node_modules/sweetalert2/dist/sweetalert2.all.js\");\n/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var bootstrap_dist_css_bootstrap_min_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! bootstrap/dist/css/bootstrap.min.css */ \"(app-pages-browser)/./node_modules/bootstrap/dist/css/bootstrap.min.css\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\n\n\n\nfunction ProductInventry() {\n    _s();\n    const [productList, setProductList] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);\n    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);\n    // Fetch products when the component mounts\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        try {\n            axios__WEBPACK_IMPORTED_MODULE_5__[\"default\"].get(\"\".concat(\"http://localhost:3002/product/view-all-products\")).then((result)=>{\n                console.log(result.data.result);\n                setProductList(result.data.result);\n            }).catch((err)=>{\n                console.log(err);\n            });\n        } catch (error) {\n            console.error(\"Error fetching products:\", error);\n            sweetalert2__WEBPACK_IMPORTED_MODULE_3___default().fire({\n                title: \"Error!\",\n                text: \"There was an error fetching products\",\n                icon: \"error\"\n            });\n        } finally{\n            setLoading(false);\n        }\n    }, []);\n    // Function to change the main product image when a thumbnail is clicked\n    const changeImg = (productImg, index)=>{\n        const thumbnail = document.getElementById(\"thumbnail-\".concat(index));\n        if (thumbnail) {\n            thumbnail.src = productImg;\n        }\n    };\n    // Function to handle order creation\n    const createOrder = async (product)=>{\n        const userString = localStorage.getItem(\"user\");\n        let userId = null;\n        const user = JSON.parse(userString);\n        userId = user._id;\n        if (userId) {\n            const productId = product._id; // Get product ID\n            sweetalert2__WEBPACK_IMPORTED_MODULE_3___default().fire({\n                title: \"Are you sure?\",\n                text: \"Do you want to create an order for \".concat(product.title, \"?\"),\n                icon: \"question\",\n                showCancelButton: true,\n                confirmButtonText: \"Yes, create order\",\n                cancelButtonText: \"No, cancel\"\n            }).then(async (result)=>{\n                if (result.isConfirmed) {\n                    try {\n                        // Check stock availability\n                        const stockResponse = await axios__WEBPACK_IMPORTED_MODULE_5__[\"default\"].get(\"\".concat(\"http://localhost:3002/product/view-all-products\", \"/\").concat(productId));\n                        const { stockAvailable } = stockResponse.data;\n                        if (stockAvailable) {\n                            // Create the order\n                            await axios__WEBPACK_IMPORTED_MODULE_5__[\"default\"].post(\"\".concat(\"http://localhost:3002/order/create-order\"), {\n                                userId,\n                                productId\n                            });\n                            // Remove stock after the order is created\n                            await axios__WEBPACK_IMPORTED_MODULE_5__[\"default\"].delete(\"\".concat(\"http://localhost:3002/product/removeStock\", \"/\").concat(productId));\n                            sweetalert2__WEBPACK_IMPORTED_MODULE_3___default().fire({\n                                title: \"Order created!\",\n                                text: \"Your order has been created successfully\",\n                                icon: \"success\"\n                            });\n                        } else {\n                            // Notify the user if the product is out of stock\n                            sweetalert2__WEBPACK_IMPORTED_MODULE_3___default().fire({\n                                title: \"Out of Stock!\",\n                                text: \"Sorry, this product is out of stock.\",\n                                icon: \"error\"\n                            });\n                        }\n                    } catch (err) {\n                        console.error(\"Error handling order:\", err);\n                        sweetalert2__WEBPACK_IMPORTED_MODULE_3___default().fire({\n                            title: \"Error!\",\n                            text: \"There was an error processing your order\",\n                            icon: \"error\"\n                        });\n                    }\n                }\n            });\n        } else {\n            sweetalert2__WEBPACK_IMPORTED_MODULE_3___default().fire({\n                title: \"Error!\",\n                text: \"User is not logged in\",\n                icon: \"error\"\n            });\n        }\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: !loading ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"section\", {\n            id: \"product-inventry-parent\",\n            children: productList === null || productList === void 0 ? void 0 : productList.map((data, index)=>{\n                var _data_images, _data_title;\n                return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    id: \"product-invt\",\n                    className: \"border\",\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            className: \"d-flex justify-content-center align-items-center w-100 m-2\",\n                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"img\", {\n                                src: data.thumbnail,\n                                width: \"250px\",\n                                height: \"250px\",\n                                id: \"thumbnail-\".concat(index)\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\bhola.vishwakarma\\\\Documents\\\\Project\\\\NEXT_JS\\\\first-next-app\\\\src\\\\app\\\\product\\\\page.tsx\",\n                                lineNumber: 128,\n                                columnNumber: 15\n                            }, this)\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\bhola.vishwakarma\\\\Documents\\\\Project\\\\NEXT_JS\\\\first-next-app\\\\src\\\\app\\\\product\\\\page.tsx\",\n                            lineNumber: 127,\n                            columnNumber: 15\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            className: \"d-flex w-100 justify-content-center p-2\",\n                            children: (_data_images = data.images) === null || _data_images === void 0 ? void 0 : _data_images.map((productImg, ind)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                    className: \"border rounded ms-4\",\n                                    style: {\n                                        cursor: \"pointer\"\n                                    },\n                                    onClick: ()=>changeImg(productImg, index),\n                                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"img\", {\n                                        src: productImg,\n                                        alt: \"image\",\n                                        style: {\n                                            width: \"50px\",\n                                            height: \"50px\"\n                                        }\n                                    }, void 0, false, {\n                                        fileName: \"C:\\\\Users\\\\bhola.vishwakarma\\\\Documents\\\\Project\\\\NEXT_JS\\\\first-next-app\\\\src\\\\app\\\\product\\\\page.tsx\",\n                                        lineNumber: 135,\n                                        columnNumber: 21\n                                    }, this)\n                                }, ind, false, {\n                                    fileName: \"C:\\\\Users\\\\bhola.vishwakarma\\\\Documents\\\\Project\\\\NEXT_JS\\\\first-next-app\\\\src\\\\app\\\\product\\\\page.tsx\",\n                                    lineNumber: 134,\n                                    columnNumber: 19\n                                }, this))\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\bhola.vishwakarma\\\\Documents\\\\Project\\\\NEXT_JS\\\\first-next-app\\\\src\\\\app\\\\product\\\\page.tsx\",\n                            lineNumber: 132,\n                            columnNumber: 15\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h6\", {\n                            className: \"text-center fw-bold\",\n                            children: (_data_title = data.title) === null || _data_title === void 0 ? void 0 : _data_title.slice(0, 25)\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\bhola.vishwakarma\\\\Documents\\\\Project\\\\NEXT_JS\\\\first-next-app\\\\src\\\\app\\\\product\\\\page.tsx\",\n                            lineNumber: 141,\n                            columnNumber: 15\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                            className: \"text-center text-success fs-6 m-1\",\n                            children: [\n                                \"Category : \",\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"b\", {\n                                    className: \"fw-bold\",\n                                    children: data.categoryName\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\Users\\\\bhola.vishwakarma\\\\Documents\\\\Project\\\\NEXT_JS\\\\first-next-app\\\\src\\\\app\\\\product\\\\page.tsx\",\n                                    lineNumber: 144,\n                                    columnNumber: 28\n                                }, this)\n                            ]\n                        }, void 0, true, {\n                            fileName: \"C:\\\\Users\\\\bhola.vishwakarma\\\\Documents\\\\Project\\\\NEXT_JS\\\\first-next-app\\\\src\\\\app\\\\product\\\\page.tsx\",\n                            lineNumber: 143,\n                            columnNumber: 15\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            className: \"text-center\",\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h6\", {\n                                    id: \"price\",\n                                    className: \"d-inline p-1\",\n                                    children: [\n                                        \"Price: \",\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"b\", {\n                                            children: (data.price * 10).toFixed(2)\n                                        }, void 0, false, {\n                                            fileName: \"C:\\\\Users\\\\bhola.vishwakarma\\\\Documents\\\\Project\\\\NEXT_JS\\\\first-next-app\\\\src\\\\app\\\\product\\\\page.tsx\",\n                                            lineNumber: 149,\n                                            columnNumber: 24\n                                        }, this),\n                                        \" \",\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_FaRupeeSign_react_icons_fa__WEBPACK_IMPORTED_MODULE_6__.FaRupeeSign, {}, void 0, false, {\n                                            fileName: \"C:\\\\Users\\\\bhola.vishwakarma\\\\Documents\\\\Project\\\\NEXT_JS\\\\first-next-app\\\\src\\\\app\\\\product\\\\page.tsx\",\n                                            lineNumber: 149,\n                                            columnNumber: 62\n                                        }, this)\n                                    ]\n                                }, void 0, true, {\n                                    fileName: \"C:\\\\Users\\\\bhola.vishwakarma\\\\Documents\\\\Project\\\\NEXT_JS\\\\first-next-app\\\\src\\\\app\\\\product\\\\page.tsx\",\n                                    lineNumber: 148,\n                                    columnNumber: 15\n                                }, this),\n                                \"\\xa0\\xa0\\xa0\",\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                                    className: \"text-center m-0\",\n                                    children: [\n                                        data.discountPercentage,\n                                        \"% Off\"\n                                    ]\n                                }, void 0, true, {\n                                    fileName: \"C:\\\\Users\\\\bhola.vishwakarma\\\\Documents\\\\Project\\\\NEXT_JS\\\\first-next-app\\\\src\\\\app\\\\product\\\\page.tsx\",\n                                    lineNumber: 151,\n                                    columnNumber: 15\n                                }, this)\n                            ]\n                        }, void 0, true, {\n                            fileName: \"C:\\\\Users\\\\bhola.vishwakarma\\\\Documents\\\\Project\\\\NEXT_JS\\\\first-next-app\\\\src\\\\app\\\\product\\\\page.tsx\",\n                            lineNumber: 147,\n                            columnNumber: 15\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"center\", {\n                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                className: \"m-2 btn btn-primary center w-75\",\n                                onClick: ()=>createOrder(data),\n                                children: \"Order now\"\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\bhola.vishwakarma\\\\Documents\\\\Project\\\\NEXT_JS\\\\first-next-app\\\\src\\\\app\\\\product\\\\page.tsx\",\n                                lineNumber: 156,\n                                columnNumber: 17\n                            }, this)\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\bhola.vishwakarma\\\\Documents\\\\Project\\\\NEXT_JS\\\\first-next-app\\\\src\\\\app\\\\product\\\\page.tsx\",\n                            lineNumber: 155,\n                            columnNumber: 15\n                        }, this)\n                    ]\n                }, data._id, true, {\n                    fileName: \"C:\\\\Users\\\\bhola.vishwakarma\\\\Documents\\\\Project\\\\NEXT_JS\\\\first-next-app\\\\src\\\\app\\\\product\\\\page.tsx\",\n                    lineNumber: 125,\n                    columnNumber: 13\n                }, this);\n            })\n        }, void 0, false, {\n            fileName: \"C:\\\\Users\\\\bhola.vishwakarma\\\\Documents\\\\Project\\\\NEXT_JS\\\\first-next-app\\\\src\\\\app\\\\product\\\\page.tsx\",\n            lineNumber: 123,\n            columnNumber: 9\n        }, this) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h2\", {\n                children: \"Loading...\"\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\bhola.vishwakarma\\\\Documents\\\\Project\\\\NEXT_JS\\\\first-next-app\\\\src\\\\app\\\\product\\\\page.tsx\",\n                lineNumber: 163,\n                columnNumber: 11\n            }, this)\n        }, void 0, false, {\n            fileName: \"C:\\\\Users\\\\bhola.vishwakarma\\\\Documents\\\\Project\\\\NEXT_JS\\\\first-next-app\\\\src\\\\app\\\\product\\\\page.tsx\",\n            lineNumber: 162,\n            columnNumber: 9\n        }, this)\n    }, void 0, false);\n}\n_s(ProductInventry, \"X3n1gIA8MetBioVoUhFv0BX9Bjk=\");\n_c = ProductInventry;\n/* harmony default export */ __webpack_exports__[\"default\"] = (ProductInventry);\nvar _c;\n$RefreshReg$(_c, \"ProductInventry\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvcHJvZHVjdC9wYWdlLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFDMEI7QUFDa0I7QUFDQztBQUN6QjtBQUNXO0FBQ2U7QUFnQjlDLFNBQVNLOztJQUNQLE1BQU0sQ0FBQ0MsYUFBYUMsZUFBZSxHQUFHTCwrQ0FBUUEsQ0FBWSxFQUFFO0lBQzVELE1BQU0sQ0FBQ00sU0FBU0MsV0FBVyxHQUFHUCwrQ0FBUUEsQ0FBVTtJQUVoRCwyQ0FBMkM7SUFDM0NELGdEQUFTQSxDQUFDO1FBQ04sSUFBSTtZQUVGRCw2Q0FBS0EsQ0FBQ1UsR0FBRyxDQUFDLEdBQTRDLE9BQXpDQyxpREFBd0MsR0FBSUcsSUFBSSxDQUFDQyxDQUFBQTtnQkFDMURDLFFBQVFDLEdBQUcsQ0FBQ0YsT0FBT0csSUFBSSxDQUFDSCxNQUFNO2dCQUM5QlIsZUFBZVEsT0FBT0csSUFBSSxDQUFDSCxNQUFNO1lBQ3JDLEdBQUdJLEtBQUssQ0FBQ0MsQ0FBQUE7Z0JBQ0xKLFFBQVFDLEdBQUcsQ0FBQ0c7WUFDaEI7UUFDRixFQUFFLE9BQU9DLE9BQU87WUFDZEwsUUFBUUssS0FBSyxDQUFDLDRCQUE0QkE7WUFDMUNqQix1REFBUyxDQUFDO2dCQUNSbUIsT0FBTztnQkFDUEMsTUFBTTtnQkFDTkMsTUFBTTtZQUNSO1FBQ0YsU0FBVTtZQUNSaEIsV0FBVztRQUNiO0lBQ0YsR0FBRSxFQUFFO0lBRU4sd0VBQXdFO0lBQ3hFLE1BQU1pQixZQUFZLENBQUNDLFlBQW9CQztRQUNyQyxNQUFNQyxZQUFZQyxTQUFTQyxjQUFjLENBQUMsYUFBbUIsT0FBTkg7UUFDdkQsSUFBSUMsV0FBVztZQUNiQSxVQUFVRyxHQUFHLEdBQUdMO1FBQ2xCO0lBQ0Y7SUFFQSxvQ0FBb0M7SUFDcEMsTUFBTU0sY0FBYyxPQUFPQztRQUN6QixNQUFNQyxhQUFpQkMsYUFBYUMsT0FBTyxDQUFDO1FBQzVDLElBQUlDLFNBQXFCO1FBQ3pCLE1BQU1DLE9BQWFDLEtBQUtDLEtB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Ozs4Q0FDZiw4REFBQ1U7b0NBQUdiLElBQUc7b0NBQVFHLFdBQVU7O3dDQUFlO3NEQUMvQiw4REFBQ2E7c0RBQUcsQ0FBQ3JELEtBQUt1RCxLQUFLLEdBQUcsRUFBQyxFQUFHQyxPQUFPLENBQUM7Ozs7Ozt3Q0FBTztzREFBQyw4REFBQ3ZFLDBGQUFXQTs7Ozs7Ozs7Ozs7Z0NBQ3REOzhDQUNMLDhEQUFDd0U7b0NBQUtqQixXQUFVOzt3Q0FBbUJ4QyxLQUFLMEQsa0JBQWtCO3dDQUFDOzs7Ozs7Ozs7Ozs7O3NDQUkzRCw4REFBQ0M7c0NBQ0MsNEVBQUNDO2dDQUFPcEIsV0FBVTtnQ0FBa0NRLFNBQVMsSUFBTWpDLFlBQVlmOzBDQUFPOzs7Ozs7Ozs7Ozs7bUJBL0IzQ0EsS0FBS3dCLEdBQUc7Ozs7Ozs7Ozs7aUNBcUMzRCw4REFBQ2U7c0JBQ0MsNEVBQUNzQjswQkFBRzs7Ozs7Ozs7Ozs7O0FBS2Q7R0FqSlMxRTtLQUFBQTtBQW1KVCwrREFBZUEsZUFBZUEsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvYXBwL3Byb2R1Y3QvcGFnZS50c3g/Yjg0YSJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBjbGllbnRcIlxyXG5pbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xyXG5pbXBvcnQgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBGYVJ1cGVlU2lnbiB9IGZyb20gJ3JlYWN0LWljb25zL2ZhJztcclxuaW1wb3J0ICcuL3BhZ2UuY3NzJztcclxuaW1wb3J0IFN3YWwgZnJvbSAnc3dlZXRhbGVydDInO1xyXG5pbXBvcnQgJ2Jvb3RzdHJhcC9kaXN0L2Nzcy9ib290c3RyYXAubWluLmNzcyc7XHJcbi8vIERlZmluZSBUeXBlU2NyaXB0IGludGVyZmFjZXMgZm9yIHByb2R1Y3QgZGF0YVxyXG5pbnRlcmZhY2UgUHJvZHVjdCB7XHJcbiAgX2lkOiBzdHJpbmc7XHJcbiAgdGl0bGU6IHN0cmluZztcclxuICBjYXRlZ29yeU5hbWU6IHN0cmluZztcclxuICBwcmljZTogbnVtYmVyO1xyXG4gIGRpc2NvdW50UGVyY2VudGFnZTogbnVtYmVyO1xyXG4gIHRodW1ibmFpbDogc3RyaW5nO1xyXG4gIGltYWdlczogc3RyaW5nW107XHJcbn1cclxuXHJcbmludGVyZmFjZSBVc2VyIHtcclxuICBfaWQ6IHN0cmluZztcclxufVxyXG5cclxuZnVuY3Rpb24gUHJvZHVjdEludmVudHJ5KCkge1xyXG4gIGNvbnN0IFtwcm9kdWN0TGlzdCwgc2V0UHJvZHVjdExpc3RdID0gdXNlU3RhdGU8UHJvZHVjdFtdPihbXSk7XHJcbiAgY29uc3QgW2xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGU8Ym9vbGVhbj4odHJ1ZSk7XHJcblxyXG4gIC8vIEZldGNoIHByb2R1Y3RzIHdoZW4gdGhlIGNvbXBvbmVudCBtb3VudHNcclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgICB0cnkge1xyXG5cclxuICAgICAgICBheGlvcy5nZXQoYCR7cHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfUFJPRFVDVF9WSUVXX0FMTH1gKS50aGVuKHJlc3VsdD0+e1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQuZGF0YS5yZXN1bHQpXHJcbiAgICAgICAgICAgIHNldFByb2R1Y3RMaXN0KHJlc3VsdC5kYXRhLnJlc3VsdCk7XHJcbiAgICAgICAgfSkuY2F0Y2goZXJyPT57XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgZmV0Y2hpbmcgcHJvZHVjdHM6JywgZXJyb3IpO1xyXG4gICAgICAgIFN3YWwuZmlyZSh7XHJcbiAgICAgICAgICB0aXRsZTogJ0Vycm9yIScsXHJcbiAgICAgICAgICB0ZXh0OiAnVGhlcmUgd2FzIGFuIGVycm9yIGZldGNoaW5nIHByb2R1Y3RzJyxcclxuICAgICAgICAgIGljb246ICdlcnJvcidcclxuICAgICAgICB9KTtcclxuICAgICAgfSBmaW5hbGx5IHtcclxuICAgICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcclxuICAgICAgfVxyXG4gICAgfSxbXSk7XHJcblxyXG4gIC8vIEZ1bmN0aW9uIHRvIGNoYW5nZSB0aGUgbWFpbiBwcm9kdWN0IGltYWdlIHdoZW4gYSB0aHVtYm5haWwgaXMgY2xpY2tlZFxyXG4gIGNvbnN0IGNoYW5nZUltZyA9IChwcm9kdWN0SW1nOiBzdHJpbmcsIGluZGV4OiBudW1iZXIpID0+IHtcclxuICAgIGNvbnN0IHRodW1ibmFpbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGB0aHVtYm5haWwtJHtpbmRleH1gKSBhcyBIVE1MSW1hZ2VFbGVtZW50O1xyXG4gICAgaWYgKHRodW1ibmFpbCkge1xyXG4gICAgICB0aHVtYm5haWwuc3JjID0gcHJvZHVjdEltZztcclxuICAgIH1cclxuICB9O1xyXG5cclxuICAvLyBGdW5jdGlvbiB0byBoYW5kbGUgb3JkZXIgY3JlYXRpb25cclxuICBjb25zdCBjcmVhdGVPcmRlciA9IGFzeW5jIChwcm9kdWN0OiBQcm9kdWN0KSA9PiB7XHJcbiAgICBjb25zdCB1c2VyU3RyaW5nOmFueSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd1c2VyJyk7XHJcbiAgICBsZXQgdXNlcklkOiBhbnkgfCBudWxsID0gbnVsbDtcclxuICAgIGNvbnN0IHVzZXI6IFVzZXIgPSBKU09OLnBhcnNlKHVzZXJTdHJpbmcpO1xyXG4gICAgdXNlcklkID0gdXNlci5faWQ7XHJcbiAgICBpZiAodXNlcklkKSB7XHJcbiAgICAgIGNvbnN0IHByb2R1Y3RJZCA9IHByb2R1Y3QuX2lkOyAvLyBHZXQgcHJvZHVjdCBJRFxyXG5cclxuICAgICAgU3dhbC5maXJlKHtcclxuICAgICAgICB0aXRsZTogJ0FyZSB5b3Ugc3VyZT8nLFxyXG4gICAgICAgIHRleHQ6IGBEbyB5b3Ugd2FudCB0byBjcmVhdGUgYW4gb3JkZXIgZm9yICR7cHJvZHVjdC50aXRsZX0/YCxcclxuICAgICAgICBpY29uOiAncXVlc3Rpb24nLFxyXG4gICAgICAgIHNob3dDYW5jZWxCdXR0b246IHRydWUsXHJcbiAgICAgICAgY29uZmlybUJ1dHRvblRleHQ6ICdZZXMsIGNyZWF0ZSBvcmRlcicsXHJcbiAgICAgICAgY2FuY2VsQnV0dG9uVGV4dDogJ05vLCBjYW5jZWwnXHJcbiAgICAgIH0pLnRoZW4oYXN5bmMgKHJlc3VsdDphbnkpID0+IHtcclxuICAgICAgICBpZiAocmVzdWx0LmlzQ29uZmlybWVkKSB7XHJcbiAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAvLyBDaGVjayBzdG9jayBhdmFpbGFiaWxpdHlcclxuICAgICAgICAgICAgY29uc3Qgc3RvY2tSZXNwb25zZSA9IGF3YWl0IGF4aW9zLmdldChgJHtwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19QUk9EVUNUX1ZJRVdfQUxMfS8ke3Byb2R1Y3RJZH1gKTtcclxuICAgICAgICAgICAgY29uc3QgeyBzdG9ja0F2YWlsYWJsZSB9ID0gc3RvY2tSZXNwb25zZS5kYXRhO1xyXG5cclxuICAgICAgICAgICAgaWYgKHN0b2NrQXZhaWxhYmxlKSB7XHJcbiAgICAgICAgICAgICAgLy8gQ3JlYXRlIHRoZSBvcmRlclxyXG4gICAgICAgICAgICAgIGF3YWl0IGF4aW9zLnBvc3QoYCR7cHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfT1JERVJfQ1JFQVRFfWAsIHsgdXNlcklkLCBwcm9kdWN0SWQgfSk7XHJcblxyXG4gICAgICAgICAgICAgIC8vIFJlbW92ZSBzdG9jayBhZnRlciB0aGUgb3JkZXIgaXMgY3JlYXRlZFxyXG4gICAgICAgICAgICAgIGF3YWl0IGF4aW9zLmRlbGV0ZShgJHtwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19QUk9EVUNUX1JFTU9WRV9TVE9DS30vJHtwcm9kdWN0SWR9YCk7XHJcblxyXG4gICAgICAgICAgICAgIFN3YWwuZmlyZSh7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogJ09yZGVyIGNyZWF0ZWQhJyxcclxuICAgICAgICAgICAgICAgIHRleHQ6ICdZb3VyIG9yZGVyIGhhcyBiZWVuIGNyZWF0ZWQgc3VjY2Vzc2Z1bGx5JyxcclxuICAgICAgICAgICAgICAgIGljb246ICdzdWNjZXNzJ1xyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIC8vIE5vdGlmeSB0aGUgdXNlciBpZiB0aGUgcHJvZHVjdCBpcyBvdXQgb2Ygc3RvY2tcclxuICAgICAgICAgICAgICBTd2FsLmZpcmUoe1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6ICdPdXQgb2YgU3RvY2shJyxcclxuICAgICAgICAgICAgICAgIHRleHQ6ICdTb3JyeSwgdGhpcyBwcm9kdWN0IGlzIG91dCBvZiBzdG9jay4nLFxyXG4gICAgICAgICAgICAgICAgaWNvbjogJ2Vycm9yJ1xyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgaGFuZGxpbmcgb3JkZXI6JywgZXJyKTtcclxuICAgICAgICAgICAgU3dhbC5maXJlKHtcclxuICAgICAgICAgICAgICB0aXRsZTogJ0Vycm9yIScsXHJcbiAgICAgICAgICAgICAgdGV4dDogJ1RoZXJlIHdhcyBhbiBlcnJvciBwcm9jZXNzaW5nIHlvdXIgb3JkZXInLFxyXG4gICAgICAgICAgICAgIGljb246ICdlcnJvcidcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIFN3YWwuZmlyZSh7XHJcbiAgICAgICAgdGl0bGU6ICdFcnJvciEnLFxyXG4gICAgICAgIHRleHQ6ICdVc2VyIGlzIG5vdCBsb2dnZWQgaW4nLFxyXG4gICAgICAgIGljb246ICdlcnJvcidcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDw+XHJcbiAgICAgIHsvKiBNYWluIHNlY3Rpb24gZm9yIGRpc3BsYXlpbmcgcHJvZHVjdHMgKi99XHJcbiAgICAgIHshbG9hZGluZyA/IChcclxuICAgICAgICA8c2VjdGlvbiBpZD1cInByb2R1Y3QtaW52ZW50cnktcGFyZW50XCI+XHJcbiAgICAgICAgICB7cHJvZHVjdExpc3Q/Lm1hcCgoZGF0YSwgaW5kZXgpID0+IChcclxuICAgICAgICAgICAgPGRpdiBpZD1cInByb2R1Y3QtaW52dFwiIGNsYXNzTmFtZT0nYm9yZGVyJyBrZXk9e2RhdGEuX2lkfT5cclxuICAgICAgICAgICAgICB7LyogTWFpbiBwcm9kdWN0IGltYWdlICovfVxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdkLWZsZXgganVzdGlmeS1jb250ZW50LWNlbnRlciBhbGlnbi1pdGVtcy1jZW50ZXIgdy0xMDAgbS0yJz5cclxuICAgICAgICAgICAgICA8aW1nIHNyYz17ZGF0YS50aHVtYm5haWx9IHdpZHRoPVwiMjUwcHhcIiBoZWlnaHQ9XCIyNTBweFwiIGlkPXtgdGh1bWJuYWlsLSR7aW5kZXh9YH0gLz5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgey8qIFRodW1ibmFpbHMgZm9yIGNoYW5naW5nIHRoZSBtYWluIHByb2R1Y3QgaW1hZ2UgKi99XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkLWZsZXggdy0xMDAganVzdGlmeS1jb250ZW50LWNlbnRlciBwLTJcIj5cclxuICAgICAgICAgICAgICAgIHtkYXRhLmltYWdlcz8ubWFwKChwcm9kdWN0SW1nLCBpbmQpID0+XHJcbiAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtpbmR9IGNsYXNzTmFtZT1cImJvcmRlciByb3VuZGVkIG1zLTRcIiBzdHlsZT17eyBjdXJzb3I6ICdwb2ludGVyJyB9fSBvbkNsaWNrPXsoKSA9PiBjaGFuZ2VJbWcocHJvZHVjdEltZywgaW5kZXgpfT5cclxuICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz17cHJvZHVjdEltZ30gYWx0PVwiaW1hZ2VcIiBzdHlsZT17eyB3aWR0aDogJzUwcHgnLCBoZWlnaHQ6ICc1MHB4JyB9fSAvPlxyXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgIHsvKiBQcm9kdWN0IHRpdGxlICovfVxyXG4gICAgICAgICAgICAgIDxoNiBjbGFzc05hbWU9J3RleHQtY2VudGVyIGZ3LWJvbGQnPntkYXRhLnRpdGxlPy5zbGljZSgwLCAyNSl9PC9oNj5cclxuICAgICAgICAgICAgICB7LyogUHJvZHVjdCBjYXRlZ29yeSAqL31cclxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlciB0ZXh0LXN1Y2Nlc3MgZnMtNiBtLTFcIj5cclxuICAgICAgICAgICAgICAgIENhdGVnb3J5IDogPGIgY2xhc3NOYW1lPVwiZnctYm9sZFwiPntkYXRhLmNhdGVnb3J5TmFtZX08L2I+XHJcbiAgICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgICAgIHsvKiBQcm9kdWN0IHByaWNlIGFuZCBkaXNjb3VudCAqL31cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ndGV4dC1jZW50ZXInPlxyXG4gICAgICAgICAgICAgIDxoNiBpZD1cInByaWNlXCIgY2xhc3NOYW1lPSdkLWlubGluZSBwLTEnPlxyXG4gICAgICAgICAgICAgICAgUHJpY2U6IDxiPnsoZGF0YS5wcmljZSAqIDEwKS50b0ZpeGVkKDIpfTwvYj4gPEZhUnVwZWVTaWduIC8+XHJcbiAgICAgICAgICAgICAgPC9oNj4mbmJzcDsmbmJzcDsmbmJzcDtcclxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9J3RleHQtY2VudGVyIG0tMCc+e2RhdGEuZGlzY291bnRQZXJjZW50YWdlfSUgT2ZmPC9zcGFuPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICB7LyogQnV0dG9uIHRvIGNyZWF0ZSBhbiBvcmRlciAqL31cclxuICAgICAgICAgICAgICA8Y2VudGVyPlxyXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJtLTIgYnRuIGJ0bi1wcmltYXJ5IGNlbnRlciB3LTc1XCIgb25DbGljaz17KCkgPT4gY3JlYXRlT3JkZXIoZGF0YSl9Pk9yZGVyIG5vdzwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgIDwvY2VudGVyPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICkpfVxyXG4gICAgICAgIDwvc2VjdGlvbj5cclxuICAgICAgKSA6IChcclxuICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgPGgyPkxvYWRpbmcuLi48L2gyPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICApfVxyXG4gICAgPC8+XHJcbiAgKTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUHJvZHVjdEludmVudHJ5O1xyXG4iXSwibmFtZXMiOlsiYXhpb3MiLCJ1c2VFZmZlY3QiLCJ1c2VTdGF0ZSIsIkZhUnVwZWVTaWduIiwiU3dhbCIsIlByb2R1Y3RJbnZlbnRyeSIsInByb2R1Y3RMaXN0Iiwic2V0UHJvZHVjdExpc3QiLCJsb2FkaW5nIiwic2V0TG9hZGluZyIsImdldCIsInByb2Nlc3MiLCJlbnYiLCJORVhUX1BVQkxJQ19QUk9EVUNUX1ZJRVdfQUxMIiwidGhlbiIsInJlc3VsdCIsImNvbnNvbGUiLCJsb2ciLCJkYXRhIiwiY2F0Y2giLCJlcnIiLCJlcnJvciIsImZpcmUiLCJ0aXRsZSIsInRleHQiLCJpY29uIiwiY2hhbmdlSW1nIiwicHJvZHVjdEltZyIsImluZGV4IiwidGh1bWJuYWlsIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInNyYyIsImNyZWF0ZU9yZGVyIiwicHJvZHVjdCIsInVzZXJTdHJpbmciLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwidXNlcklkIiwidXNlciIsIkpTT04iLCJwYXJzZSIsIl9pZCIsInByb2R1Y3RJZCIsInNob3dDYW5jZWxCdXR0b24iLCJjb25maXJtQnV0dG9uVGV4dCIsImNhbmNlbEJ1dHRvblRleHQiLCJpc0NvbmZpcm1lZCIsInN0b2NrUmVzcG9uc2UiLCJzdG9ja0F2YWlsYWJsZSIsInBvc3QiLCJORVhUX1BVQkxJQ19PUkRFUl9DUkVBVEUiLCJkZWxldGUiLCJORVhUX1BVQkxJQ19QUk9EVUNUX1JFTU9WRV9TVE9DSyIsInNlY3Rpb24iLCJpZCIsIm1hcCIsImRpdiIsImNsYXNzTmFtZSIsImltZyIsIndpZHRoIiwiaGVpZ2h0IiwiaW1hZ2VzIiwiaW5kIiwic3R5bGUiLCJjdXJzb3IiLCJvbkNsaWNrIiwiYWx0IiwiaDYiLCJzbGljZSIsInAiLCJiIiwiY2F0ZWdvcnlOYW1lIiwicHJpY2UiLCJ0b0ZpeGVkIiwic3BhbiIsImRpc2NvdW50UGVyY2VudGFnZSIsImNlbnRlciIsImJ1dHRvbiIsImgyIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/product/page.tsx\n"));

/***/ })

});
sap.ui.define([
    "sap/ui/core/Fragment",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
    "sap/m/PDFViewer",
    "sap/ui/core/BusyIndicator",
    "sap/ui/core/format/DateFormat",
    "sap/ui/core/ValueState"
], function (Fragment, MessageToast, MessageBox, PDFViewer, BusyIndicator, DateFormat, ValueState) {
    'use strict';

    return {
        /**
         * Validates all Input fields in the CurrentInfoTable
         * @returns {boolean} true if all inputs are valid, false otherwise
         */
        _validateCurrentInfoTable: function() {
            var oTable = Fragment.byId("PCInputFrag", "CurrentInfoTable");
            if (!oTable) {
                return true; // Table not found, skip validation
            }
            
            var aItems = oTable.getItems();
            var bIsValid = true;
            var aInvalidFields = [];
            
            aItems.forEach(function(oItem) {
                var aCells = oItem.getCells();
                aCells.forEach(function(oCell) {
                    // Check if it's an Input control
                    if (oCell.getMetadata().getName() === "sap.m.Input") {
                        var sValueState = oCell.getValueState();
                        
                        // Skip empty values (they may be optional)
                        if (sValueState === ValueState.Error) {
                            bIsValid = false;
                            aInvalidFields.push(oCell);

                        }
                       
                    }
                });
            });
            
            return bIsValid;
        },
        
        /**
         * Clears validation states from CurrentInfoTable inputs
         */
        _clearTableValidation: function() {
            var oTable = Fragment.byId("PCInputFrag", "CurrentInfoTable");
            if (!oTable) {
                return;
            }
            
            var aItems = oTable.getItems();
            aItems.forEach(function(oItem) {
                var aCells = oItem.getCells();
                aCells.forEach(function(oCell) {
                    if (oCell.getMetadata().getName() === "sap.m.Input") {
                        oCell.setValueState(ValueState.None);
                    }
                });
            });
        },
        
        onTableChange(oEvent) {
            var oTab = Fragment.byId("PCInputFrag", "SummaryTable");
            var oAnalyticalTable = oTab.getTable();
            oAnalyticalTable.setSelectionMode("Single");
        },
        _setCustomModels() {
            var oConstants = new sap.ui.model.json.JSONModel(
                {
                    RETPC: 0,
                    RETTP: 0,
                    TAXPCT: 0
                }
            );

            this.getView().setModel(oConstants, 'Constants');
            var oCurrency = new sap.ui.model.json.JSONModel(
                {
                    Name: 'AED'
                }
            );

            this.getView().setModel(oCurrency, 'Currency');

            var oCertHeader = new sap.ui.model.json.JSONModel(
                {
                    Name: ''
                }
            );

            this.getView().setModel(oCertHeader, 'CertHeader');
            var oFirstCol = new sap.ui.model.json.JSONModel(
                {
                    'Row1': {
                        1: 'Work In Progress'
                    },
                    'Row2': {
                        1: 'Variation Addition'
                    },
                    'Row3': {
                        1: 'Variation Omission'
                    },
                    'Row4': {
                        1: 'Material Onsite'
                    },
                    'Row5': {
                        1: 'Material Onsite Recovered'
                    },
                    'Row6': {
                        1: 'Total Work Completed'
                    },
                    'Row7': {
                        1: 'Advance Payment'
                    },
                    'Row8': {
                        1: 'Advance Payment Recovery'
                    },
                    'Row9': {
                        1: 'Retention Held To Date'
                    },
                    'Row10': {
                        1: 'Release Of Retention'
                    },
                    'Row11': {
                        1: 'Contra Charges'
                    },
                    'Row12': {
                        1: 'Net Amount certified'
                    }
                    ,
                    'Row13': {
                        1: 'VAT'
                    }
                    ,
                    'Row14': {
                        1: 'Total Payable'
                    }
                }
            );
            this.getView().setModel(oFirstCol, 'FirstCol');

            var oMode = new sap.ui.model.json.JSONModel(
                {
                    IsEditable: true,
                    IsCreateBttnEnabled: false,
                    IsUpdatable: false,
                    IsDwnlBttnEnabled: false,
                    IsExcludedCompanyCode: false
                }

            );
            this.getView().setModel(oMode, 'Mode');
            var oOrigContractModel = new sap.ui.model.json.JSONModel(
                {
                    PCPcOgWip: 0,
                    PCPcOgVad: 0,
                    PCPcOgVom: 0,
                    PCPcOgMtOn: 0,
                    PCPcOgMtRec: 0,
                    PCPcOgAdvPy: 0,
                    PCPcOgAdvRec: 0
                }
            );
            this.getView().setModel(oOrigContractModel, 'OrigContract');
            var oPrevCumlModel = new sap.ui.model.json.JSONModel(
                {
                    PCPcMWi: 0,
                    PCPCmVAd: 0,
                    PCPCmVOm: 0,
                    PCPCmMtOn: 0,
                    PCPCmMtRec: 0,
                    PCPCmTotComp: 0,
                    PCPCmAdvPy: 0,
                    PCPCmAdvRec: 0,
                    PCPCmRetHld: 0,
                    PCPCmRetRel: 0,
                    PCPCmContDed: 0,
                    PCPCmNetCer: 0,
                    PCPCmVat: 0,
                    PCPCmTotPay: 0
                }
            );
            this.getView().setModel(oPrevCumlModel, 'PrevCuml');
            var oCuml2DateModelModel = new sap.ui.model.json.JSONModel(
                {
                    PCCdWipAm: 0,
                    PCCdVarAd1: 0,
                    PCCdVarOm1: 0,
                    PCCdmatOns: 0,
                    PCCdMatRec: 0,
                    PCCdTotComp: 0,
                    PCCdAdvPym: 0,
                    PCCdAdvPymRec: 0,
                    PCCdLessRet: 0,
                    PCCdRevRet: 0,
                    PCCdContDed: 0,
                    PCCdNetCer: 0,
                    PCCdTax: 0,
                    PCCdTotPay: 0
                });
            this.getView().setModel(oCuml2DateModelModel, 'Cuml2Date');

            var oCuml2DateBackEndModel = new sap.ui.model.json.JSONModel(JSON.parse(JSON.stringify(oCuml2DateModelModel.getData())));
            this.getView().setModel(oCuml2DateBackEndModel, 'Cuml2DateBackEnd');

            var oCurrModel = new sap.ui.model.json.JSONModel(
                {
                    PCWipAm: 0,
                    PCVarAd1: 0,
                    PCVaRom1: 0,
                    PCMatOns: 0,
                    PCMatRec: 0,
                    PCTotComp: 0,
                    PCAdvPym: 0,
                    PCAdvPymRec: 0,
                    PCLessRet: 0,
                    PCRevRet: 0,
                    PCContDed: 0,
                    PCNetCer: 0,
                    PCTax: 0,
                    PCTotPay: 0
                }
            );
            this.getView().setModel(oCurrModel, 'CurrModel');
            var oRemarksModel = new sap.ui.model.json.JSONModel({

                PCPcTxtWip: '',
                PCPcTxtVad: '',
                PCPcTxtVom: '',
                PCPcTxtMtOn: '',
                PCPcTxtMtRec: '',
                PCPctxtAdvPy: '',
                PCPcTxtAdvRec: ''
            }
            );
            this.getView().setModel(oRemarksModel, 'Remarks');

            // this.getView().setModel(oCurrModel, 'CurrModel');
        },

        _setDefaultValues(oPOItem) {
            var that = this;
            var oModel = this.getView().getModel();
            //oForm.bindElement({ path: "/Z_C_OTC_WAR_CERT_HEAD(WcertNo='2025-00000000002',Version='160525210855',DelNo='0080000008')"})

            const pRead1 = new Promise((fResolve, fReject) => {
                oModel.read("/PaymentCertGenInfo", {
                    filters: [
                        new sap.ui.model.Filter("PurchaseOrder", sap.ui.model.FilterOperator.EQ, oPOItem.PO),
                        new sap.ui.model.Filter("PurchaseOrderItem", sap.ui.model.FilterOperator.EQ, oPOItem.POItem),
                        new sap.ui.model.Filter("Project", sap.ui.model.FilterOperator.EQ, oPOItem.Project),
                        new sap.ui.model.Filter("WBSElement", sap.ui.model.FilterOperator.EQ, oPOItem.WBSElement)
                    ],
                    success: (oDataResponse) => {
                        if (!oDataResponse.results || oDataResponse.results.length === 0) {
                            MessageBox.error(
                                'No Data found.Please Check Project and WBS Element', {
                                icon: MessageBox.Icon.Error,
                                title: "Error",
                            }
                            );
                            fReject("No PaymentCertGenInfo found");
                            return;
                        }
                        var oData = oDataResponse.results[0];

                        var oConstants = this.getView().getModel('Constants');
                        oConstants.setProperty('/RETPC', Number(oData.RETPC) || 0);
                        oConstants.setProperty('/RETTP', Number(oData.RETTP) || 0);
                        oConstants.setProperty('/TAXPCT', Number(oData.TAXPCT) || 0);
                        delete oData.RETPC;
                        delete oData.RETTP;
                        delete oData.TAXPCT;

                        this.getView().getModel('Currency').setProperty('/Name', oData.Currency);

                        var oContext =
                            oModel.createEntry("/PaymentCertifCreate",
                                {
                                    parameters: { groupId: 'Group1' },
                                    properties: oData

                                });
                        // Store the context for SmartForm binding (will be applied after fragment loads)
                        that._oSmartFormBindingContext = oContext;
                        that._sSmartFormBindingMode = "create";

                        //reload summary table
                        this._relloadSummaryTable(oPOItem);

                        var oTempData;
                        var oOrigContractModel = this.getView().getModel('OrigContract');
                        oTempData = oOrigContractModel.getData();
                        this._copySimilarProperties(oData, oTempData);
                        //set Original Model
                        oOrigContractModel.setData(oTempData);
                        //Calculate Current Model

                        fResolve();
                    },
                    error: (oError) => {
                        MessageBox.error(
                            this._getErrorMessageFromOdataError(oError), {
                            icon: MessageBox.Icon.Error,
                            title: "Error",
                        }
                        );
                        fReject(oError);
                    }
                });
            });


            const pRead2 = new Promise((fResolve, fReject) => {
                oModel.read("/LatestCumulatives(PurchaseOrder='" + oPOItem.PO + "',PurchaseOrderItem='" + oPOItem.POItem + "',Project='" + oPOItem.Project + "',WBSElement='" + oPOItem.WBSElement + "')", {
                    //groupId: "Group1",
                    success: (oData) => {
                        var oTempData;
                        var oPrevCumlModel = this.getView().getModel('PrevCuml');
                        oTempData = oPrevCumlModel.getData();
                        this._copySimilarProperties(oData, oTempData);
                        oPrevCumlModel.setData(oTempData);

                        var oCuml2DateModel = this.getView().getModel('Cuml2Date');
                        oTempData = oCuml2DateModel.getData();
                        this._copySimilarProperties(oData, oTempData);
                        oCuml2DateModel.setData(oTempData);

                        fResolve();
                    },
                    error: (oError) => {
                        //     var that = this;
                        //     MessageBox.error(
                        //         that._getErrorMessageFromOdataError(oError), {
                        //         icon: MessageBox.Icon.Error,
                        //         title: "Error",
                        //     }
                        //     );
                        fResolve();
                    }
                });
            });

            const promiseArray = [pRead1, pRead2];

            return Promise.all(promiseArray)
                .then(values => {
                    console.log('All promises resolved:'); // Output: ['Result 1', 'Result 2 immediate', 'Result 3']
                    // Apply dynamic visibility rules after initial data load
                    this._applyVisibilityRules(oPOItem.PO);
                })
                .catch(error => {
                    console.error('One of the promises rejected:', error);
                    throw error; // Re-throw to propagate rejection
                });
        },


        _setDefaultValuesUpdate(oPCert) {
            var that = this;
            var oModel = this.getView().getModel();
            //oForm.bindElement({ path: "/Z_C_OTC_WAR_CERT_HEAD(WcertNo='2025-00000000002',Version='160525210855',DelNo='0080000008')"})

            var key = "(PurchaseOrder='" + oPCert.PO + "',PurchaseOrderItem='" + oPCert.POItem + "',Project='" + oPCert.Project + "',WBSElement='" + oPCert.WBSElement + "',PCNumber='" + oPCert.PCNumber + "')";
            // Store the binding path for SmartForm (will be applied after fragment loads)
            that._sSmartFormBindingPath = "/PaymentCertifUpdate" + key;
            that._sSmartFormBindingMode = "update";


            const pRead1 = new Promise((fResolve, fReject) => {
                oModel.read("/PaymentCertGenInfo", {
                    filters: [
                        new sap.ui.model.Filter("PurchaseOrder", sap.ui.model.FilterOperator.EQ, oPCert.PO),
                        new sap.ui.model.Filter("PurchaseOrderItem", sap.ui.model.FilterOperator.EQ, oPCert.POItem),
                        new sap.ui.model.Filter("Project", sap.ui.model.FilterOperator.EQ, oPCert.Project),
                        new sap.ui.model.Filter("WBSElement", sap.ui.model.FilterOperator.EQ, oPCert.WBSElement)
                    ],
                    urlParameters: { "$select": "RETPC,RETTP,TAXPCT" },
                    success: (oDataResponse) => {
                        if (!oDataResponse.results || oDataResponse.results.length === 0) {
                            fReject("No PaymentCertGenInfo found");
                            return;
                        }
                        var oData = oDataResponse.results[0];

                        //this.getView().getModel('Currency').setProperty('/Name',oData.DocumentCurrency);

                        var oConstants = this.getView().getModel('Constants');
                        oConstants.setProperty('/RETPC', Number(oData.RETPC) || 0);
                        oConstants.setProperty('/RETTP', Number(oData.RETTP) || 0);
                        oConstants.setProperty('/TAXPCT', Number(oData.TAXPCT) || 0);
                        delete oData.RETPC;
                        delete oData.RETTP;
                        delete oData.TAXPCT;

                        this._relloadSummaryTable(oPCert);

                        var oTempData;
                        var oOrigContractModel = this.getView().getModel('OrigContract');
                        oTempData = oOrigContractModel.getData();
                        this._copySimilarProperties(oData, oTempData);
                        oOrigContractModel.setData(oTempData);

                        fResolve();
                    },
                    error: (oError) => {
                        var that = this;
                        MessageBox.error(
                            that._getErrorMessageFromOdataError(oError), {
                            icon: MessageBox.Icon.Error,
                            title: "Error",
                        }
                        );
                        fReject();
                    }
                });
            });

            const pRead2 = new Promise((fResolve, fReject) => {
                oModel.read("/PreviousCumulatives" + key, {
                    //groupId: "Group1",
                    success: (oData) => {
                        var oTempData;
                        var oPrevCumlModel = this.getView().getModel('PrevCuml');
                        oTempData = oPrevCumlModel.getData();
                        this._copySimilarProperties(oData, oTempData);
                        oPrevCumlModel.setData(oTempData);
                        fResolve();
                    },
                    error: (oError) => {
                        fResolve();
                    }
                });
            });

            const pRead3 =

                new Promise((fResolve, fReject) => {
                    oModel.read("/PaymentCertificate" + key, {
                        success: (oData) => {
                            this.getView().getModel('Currency').setProperty('/Name', oData.DocumentCurrency);

                            var oTempData;
                            var oOrigContractModel = this.getView().getModel('OrigContract');
                            oTempData = oOrigContractModel.getData();
                            this._copySimilarProperties(oData, oTempData);
                            oOrigContractModel.setData(oTempData);
                            //this.getView().setModel(oOrigContractModel, 'OrigContract');


                            var oCuml2DateModel = this.getView().getModel('Cuml2Date');
                            this._copySimilarProperties(oData, oCuml2DateModel);

                            oTempData = oCuml2DateModel.getData();
                            this._copySimilarProperties(oData, oTempData);
                            oCuml2DateModel.setData(oTempData);


                            var oCuml2DateModelBackEnd = this.getView().getModel('Cuml2DateBackEnd');
                            oTempData = oCuml2DateModelBackEnd.getData();
                            this._copySimilarProperties(oData, oTempData);
                            oCuml2DateModelBackEnd.setData(oTempData);

                            //this.getView().setModel(oCuml2DateModelModel, 'Cuml2Date');

                            var oCurrModel = this.getView().getModel('CurrModel');
                            oTempData = oCurrModel.getData();
                            this._copySimilarProperties(oData, oTempData);
                            oCurrModel.setData(oTempData);

                            var oRemarksModel = this.getView().getModel('Remarks');
                            oTempData = oRemarksModel.getData();
                            this._copySimilarProperties(oData, oTempData);
                            oRemarksModel.setData(oTempData);

                            fResolve();
                        },
                        error: (oError) => {
                            var that = this;
                            MessageBox.error(
                                that._getErrorMessageFromOdataError(oError), {
                                icon: MessageBox.Icon.Error,
                                title: "Error",
                            }
                            );
                            fReject();
                        }
                    });
                });


            const promiseArray = [pRead1, pRead2, pRead3];

            return Promise.all(promiseArray)
                .then(values => {
                    console.log('All promises resolved:'); // Output: ['Result 1', 'Result 2 immediate', 'Result 3']
                    // Apply dynamic visibility rules after update data load
                    this._applyVisibilityRules(oPCert.PO);
                })
                .catch(error => {
                    console.error('One of the promises rejected:', error);
                    throw error; // Re-throw to propagate rejection
                });
        },
        _applyVisibilityRules: function (sPurchaseOrder, sBindingPath) {
            try {
                var oModel = this.getView().getModel();
                var that = this;
                // Explicitly map IDs (derived from local metadata + fragment):
                // Payment Terms -> SmartField id 'PCPayTerm' (property PCPayTerm)
                // Due Date -> SmartField id 'PCVarOm' (bound to PCDueDate)
                // Payment Terms Back-to-Back -> 'PCPaymenB2B'
                // Payment Terms Urgent -> 'PCPaymenUrg'
                // CAR & TPL -> 'PCCrTpl'
                // Contract Insurance -> 'PCCtrIns'
                var aTargetIds = [
                    "PCPayTerm",
                    "PCVarOm",
                    "PCPaymenB2B",
                    "PCPaymenUrg",
                    "PCCrTpl",
                    "PCCtrIns",
                    "PCPaySecD",     // PS Expiry Date
                    "PCPerBnk"       // Performance Security
                ];

                // Build filter to fetch UIExcludeCompanyCode rules
                var aFilters = [
                    new sap.ui.model.Filter("PurchaseOrder", sap.ui.model.FilterOperator.EQ, sPurchaseOrder)
                ];

                oModel.read("/UIExcludeCompanyCode", {
                    filters: aFilters,
                    success: function (oDataResponse) {
                        if (!oDataResponse.results || oDataResponse.results.length === 0) {
                            // Reset flag when no results
                            that.getView().getModel('Mode').setProperty('/IsExcludedCompanyCode', false);
                            return;
                        }
                        // If any record says IsHidden, hide the target fields explicitly
                        var bHide = oDataResponse.results.some(function (rec) { return rec.IsHidden === true || rec.IsHidden === "true"; });
                        
                        // Set the IsExcludedCompanyCode flag for table column editability
                        that.getView().getModel('Mode').setProperty('/IsExcludedCompanyCode', bHide);
                        
                        // Load the appropriate SmartForm fragment based on the flag
                        that._loadSmartFormFragment(bHide, sBindingPath).then(function() {
                            // Apply visibility rules only for non-excluded company codes
                            if (!bHide) {
                                aTargetIds.forEach(function (sId) {
                                    var oSmartField = Fragment.byId("PCInputFrag", sId);
                                    if (oSmartField) {
                                        var oGroupElement = oSmartField.getParent();
                                        if (oGroupElement && oGroupElement.setVisible) {
                                            oGroupElement.setVisible(!bHide);
                                        } else if (oSmartField.setVisible) {
                                            oSmartField.setVisible(!bHide);
                                        }
                                    }
                                });
                            }
                            // Recalculate after SmartForm is loaded
                            that.calcCurrentModel();
                        });
                    },
                    error: function (oError) {
                        // Keep UI functional even if rules fail to load
                        that.getView().getModel('Mode').setProperty('/IsExcludedCompanyCode', false);
                        // Load default SmartForm on error
                        that._loadSmartFormFragment(false, sBindingPath).then(function() {
                            that.calcCurrentModel();
                        });
                        jQuery.sap.log.error("Failed to load UIExcludeCompanyCode rules: " + that._getErrorMessageFromOdataError(oError));
                    }
                });

            } catch (e) {
                jQuery.sap.log.error("_applyVisibilityRules error: " + e);
            }
        },
        
        /**
         * Dynamically loads the appropriate SmartForm fragment based on IsExcludedCompanyCode flag
         * @param {boolean} bIsExcluded - If true, loads the Excluded version, otherwise loads the default
         * @param {string} sBindingPath - Optional binding path for the SmartForm (overrides stored path)
         * @returns {Promise} Promise that resolves when fragment is loaded
         */
        _loadSmartFormFragment: function (bIsExcluded, sBindingPath) {
            var that = this;
            var oContainer = Fragment.byId("PCInputFrag", "smartFormContainer");
            
            if (!oContainer) {
                jQuery.sap.log.error("SmartForm container not found");
                return Promise.reject(new Error("SmartForm container not found"));
            }
            
            // Determine which fragment to load
            var sFragmentName = bIsExcluded 
                ? "com.atg.ppm.paymentcert.ext.fragment.PaymentCertSmartFormExcluded"
                : "com.atg.ppm.paymentcert.ext.fragment.PaymentCertSmartForm";
            
            // Clear existing content - destroy the existing SmartForm if any
            oContainer.destroyItems();
            
            // Load the fragment
            return Fragment.load({
                id: "PCInputFrag",
                name: sFragmentName,
                type: "XML",
                controller: this
            }).then(function (oSmartForm) {
                // Add the SmartForm to the container
                oContainer.addItem(oSmartForm);
                
                // Apply binding based on mode
                var sMode = that._sSmartFormBindingMode;
                if (sMode === "create" && that._oSmartFormBindingContext) {
                    // For Create mode, use setBindingContext
                    oSmartForm.setBindingContext(that._oSmartFormBindingContext);
                } else if (sBindingPath) {
                    // Use explicit path if provided
                    oSmartForm.bindElement({ path: sBindingPath, parameters: { groupId: 'Group1' } });
                } else if (that._sSmartFormBindingPath) {
                    // Use stored path for Update/Read modes
                    var oBindingParams = sMode === "update" ? { groupId: 'Group1' } : {};
                    oSmartForm.bindElement({ path: that._sSmartFormBindingPath, parameters: oBindingParams });
                }
                
                jQuery.sap.log.info("SmartForm fragment loaded: " + sFragmentName);
                return oSmartForm;
            }).catch(function (oError) {
                jQuery.sap.log.error("Failed to load SmartForm fragment: " + oError.message);
                throw oError;
            });
        },
        
        /**
         * Gets the SmartForm control (helper function)
         * @returns {sap.ui.comp.smartform.SmartForm} The SmartForm control or null
         */
        _getSmartForm: function () {
            return Fragment.byId("PCInputFrag", "SmartForm");
        },
        
        _setDefaultValuesRead(oPCert) {
            var that = this;
            var oModel = this.getView().getModel();
            //oForm.bindElement({ path: "/Z_C_OTC_WAR_CERT_HEAD(WcertNo='2025-00000000002',Version='160525210855',DelNo='0080000008')"})

            var key = "(PurchaseOrder='" + oPCert.PO + "',PurchaseOrderItem='" + oPCert.POItem + "',Project='" + oPCert.Project + "',WBSElement='" + oPCert.WBSElement + "',PCNumber='" + oPCert.PCNumber + "')";

            // Store the binding path for SmartForm (will be applied after fragment loads)
            that._sSmartFormBindingPath = "/PaymentCertifReadonly" + key;
            that._sSmartFormBindingMode = "read";

            const pRead2 = new Promise((fResolve, fReject) => {
                oModel.read("/PreviousCumulatives" + key, {
                    //groupId: "Group1",
                    success: (oData) => {
                        var oTempData;
                        var oPrevCumlModel = this.getView().getModel('PrevCuml');
                        oTempData = oPrevCumlModel.getData();
                        this._copySimilarProperties(oData, oTempData);
                        oPrevCumlModel.setData(oTempData);

                        fResolve();
                    },
                    error: (oError) => {
                        // var that = this;
                        // MessageBox.error(
                        //     that._getErrorMessageFromOdataError(oError), {
                        //     icon: MessageBox.Icon.Error,
                        //     title: "Error",
                        // }
                        // );
                        fResolve();
                    }
                });
            });

            const pRead3 =

                new Promise((fResolve, fReject) => {
                    oModel.read("/PaymentCertificate" + key, {
                        //groupId: "Group1",
                        success: (oData) => {
                            this.getView().getModel('Currency').setProperty('/Name', oData.DocumentCurrency);

                            //reload summary table
                            this._relloadSummaryTable(oPCert);

                            var oTempData;
                            var oOrigContractModel = this.getView().getModel('OrigContract');
                            oTempData = oOrigContractModel.getData();
                            this._copySimilarProperties(oData, oTempData);
                            oOrigContractModel.setData(oTempData);
                            //this.getView().setModel(oOrigContractModel, 'OrigContract');

                            var oCuml2DateModel = this.getView().getModel('Cuml2Date');
                            this._copySimilarProperties(oData, oCuml2DateModel);

                            oTempData = oCuml2DateModel.getData();
                            this._copySimilarProperties(oData, oTempData);
                            oCuml2DateModel.setData(oTempData);
                            //this.getView().setModel(oCuml2DateModelModel, 'Cuml2Date');

                            var oCurrModel = this.getView().getModel('CurrModel');
                            oTempData = oCurrModel.getData();
                            this._copySimilarProperties(oData, oTempData);
                            oCurrModel.setData(oTempData);
                            //this._copySimilarProperties(oData, oCurrModel)

                            var oRemarksModel = this.getView().getModel('Remarks');
                            oTempData = oRemarksModel.getData();
                            this._copySimilarProperties(oData, oTempData);
                            oRemarksModel.setData(oTempData);
                            //this._copySimilarProperties(oData, oRemarksModel)

                            fResolve();
                        },
                        error: (oError) => {
                            var that = this;
                            MessageBox.error(
                                that._getErrorMessageFromOdataError(oError), {
                                icon: MessageBox.Icon.Error,
                                title: "Error",
                            }
                            );
                            fReject();
                        }
                    });
                });


            const promiseArray = [pRead2, pRead3];

            return Promise.all(promiseArray)
                .then(values => {
                    console.log('All promises resolved:'); // Output: ['Result 1', 'Result 2 immediate', 'Result 3']
                    // Apply dynamic visibility rules in display mode as well
                    this._applyVisibilityRules(oPCert.PO);
                })
                .catch(error => {
                    console.error('One of the promises rejected:', error);
                    throw error; // Re-throw to propagate rejection
                });
        },

        _relloadSummaryTable(oCert) {
            var oTable = Fragment.byId("PCInputFrag", "SummaryTable");
            
            // Create filters
            var aFilters = [];
            aFilters.push(new sap.ui.model.Filter("PurchaseOrder", sap.ui.model.FilterOperator.EQ, oCert.PO));
            aFilters.push(new sap.ui.model.Filter("PurchaseOrderItem", sap.ui.model.FilterOperator.EQ, oCert.POItem));
            aFilters.push(new sap.ui.model.Filter("Project", sap.ui.model.FilterOperator.EQ, oCert.Project));
            if (oCert.PCNumber)
                aFilters.push(new sap.ui.model.Filter("PCNumber", sap.ui.model.FilterOperator.LE, oCert.PCNumber));

            // Bind rows with analytical binding and filters
            oTable.bindRows({
                path: '/PaymentCertSummary',
                filters: aFilters,
                parameters: {
                    select: 'PCNumber,PCText,PCAdvPym,PCWipAm,PCMatOns,PCAdvPymRec,PCContDed,PCLessRet,PCRevRet,PCNetCer,PCTax,PCTotPay,DocumentCurrency'
                },
                events: {
                    dataReceived: function(oEvent) {
                        setTimeout(function () {
                            var oBinding = oTable.getBinding("rows");
                            if (oBinding) {
                                var iRowCount = oBinding.getLength();

                                // Set visible row count including the totals row
                                oTable.setVisibleRowCount(iRowCount > 0 ? iRowCount : 1);

                                // Set fixed row mode to enforce exact count
                                oTable.setVisibleRowCountMode(sap.ui.table.VisibleRowCountMode.Fixed);

                                // Force refresh
                                oTable.invalidate();

                                // Add a class to identify if we have data or not
                                if (iRowCount === 0) {
                                    oTable.addStyleClass("noDataTable");
                                } else {
                                    oTable.removeStyleClass("noDataTable");
                                }
                            }
                        }, 100);
                    }
                }
            });
        },

        _copySimilarProperties(sourceObject, targetObject) {
            for (const key in sourceObject) {
                // Check if the property exists in both objects
                if (Object.prototype.hasOwnProperty.call(sourceObject, key) &&
                    Object.prototype.hasOwnProperty.call(targetObject, key)) {
                    // Copy the value if the property exists in both
                    targetObject[key] = sourceObject[key];
                }
            }
        },

        onClickCreatePC: async function (oEvent) {
            this._setCustomModels();
            this.getView().getModel('CertHeader').setProperty('/Name', "Create Payment Certificate");
            this.getView().getModel('Mode').setProperty('/IsCreateBttnEnabled', true);

            BusyIndicator.show();

            var oPOItem = oEvent.getSource().getBindingContext().getObject();
            if (!this._paramDialog) {
                Fragment.load({
                    id: "PCInputFrag",
                    name: "com.atg.ppm.paymentcert.ext.fragment.PaymentCertInput",
                    type: "XML",
                    controller: this
                }).then(async oDialog => {

                    await this._setDefaultValues(oPOItem);

                    this._paramDialog = oDialog;
                    this.getView().addDependent(oDialog);
                    this.calcCurrentModel();
                    this._paramDialog.open();
                    BusyIndicator.hide();

                }).catch(error => {
                    BusyIndicator.hide();
                    MessageBox.error("Failed to load dialog: " + error.message);
                });
            } else {
                //this.settBindingContext();
                try {
                    await this._setDefaultValues(oPOItem);
                    this.calcCurrentModel();
                    this._paramDialog.open();
                } catch (error) {
                    MessageBox.error("Failed to load data: " + error.message);
                }

            }
            //this._setFileUploader();
            //MessageToast.show("Custom handler invoked.");
        },

        onClickChangePC: async function (oEvent) {
            var that = this;
            var aSelectedItems = oEvent.getSource().getParent().getParent().getSelectedItems();
            if (!aSelectedItems || aSelectedItems.length === 0) {
                MessageToast.show("Please select a payment certificate before proceeding.");
                return;
            }
            var oPCert = aSelectedItems[0].getBindingContext().getObject();
            
            // Check if PC status is 3 (Approved) - show confirmation dialog
            if (oPCert.PCStatus === "3") {
                var oFormattedText = new sap.m.FormattedText({
                    htmlText: "Before changing an approved PC, please manually cancel the existing Service Entry Sheet.<br><br>" +
                        "Failure to do so will result in the system generating a duplicate Service Entry Sheet upon re-approval.<br><br>" +
                        "<strong>Changes to approved PCs should be made only in exceptional circumstances.</strong>"
                });
                MessageBox.warning(oFormattedText, {
                        title: "Warning - Approved Payment Certificate",
                        actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
                        emphasizedAction: MessageBox.Action.CANCEL,
                        onClose: function (sAction) {
                            if (sAction === MessageBox.Action.OK) {
                                that._proceedWithChangePC(oPCert);
                            }
                        }
                    }
                );
            } else {
                this._proceedWithChangePC(oPCert);
            }
        },

        _proceedWithChangePC: async function (oPCert) {
            this._setCustomModels();
            this.getView().getModel('CertHeader').setProperty('/Name', "Update Payment Certificate");
            this.getView().getModel('Mode').setProperty('/IsDwnlBttnEnabled', true);
            this.getView().getModel('Mode').setProperty('/IsUpdatable', true);

            BusyIndicator.show();

            if (!this._paramDialog) {
                Fragment.load({
                    id: "PCInputFrag",
                    name: "com.atg.ppm.paymentcert.ext.fragment.PaymentCertInput",
                    type: "XML",
                    controller: this
                }).then(async oDialog => {

                    await this._setDefaultValuesUpdate(oPCert);

                    this._paramDialog = oDialog;
                    this.getView().addDependent(oDialog);
                    //this.calcCurrentModel();
                    this._setFileUploader(oPCert);
                    BusyIndicator.hide();
                    this._paramDialog.open();
                    //this._setStatus1ToDraft();
                }).catch(error => {
                    BusyIndicator.hide();
                    MessageBox.error("Failed to load dialog: " + error.message);
                });
            } else {
                //this.settBindingContext();
                try {
                    await this._setDefaultValuesUpdate(oPCert);
                    //this.calcCurrentModel();
                    this._setFileUploader(oPCert);
                    BusyIndicator.hide();
                    this._paramDialog.open();
                    //this._setStatus1ToDraft();
                } catch (error) {
                    BusyIndicator.hide();
                    MessageBox.error("Failed to load data: " + error.message);
                }
            }

        },
        onClickDisplayPC: async function (oEvent, oData) {
            this._setCustomModels();
            this.getView().getModel('Mode').setProperty('/IsUpdatable', false);
            this.getView().getModel('Mode').setProperty('/IsEditable', false);
            this.getView().getModel('Mode').setProperty('/IsDwnlBttnEnabled', true);

            this.getView().getModel('CertHeader').setProperty('/Name', "Display Payment Certificate");

            BusyIndicator.show();

            var oPCert = oEvent.getSource().getParent().getParent().getSelectedItems()[0].getBindingContext().getObject();
            if (!this._paramDialog) {
                Fragment.load({
                    id: "PCInputFrag",
                    name: "com.atg.ppm.paymentcert.ext.fragment.PaymentCertInput",
                    type: "XML",
                    controller: this
                }).then(async oDialog => {

                    await this._setDefaultValuesRead(oPCert);

                    this._paramDialog = oDialog;
                    this.getView().addDependent(oDialog);
                    //this.calcCurrentModel();
                    this._setFileUploader(oPCert);
                    BusyIndicator.hide();
                    this._paramDialog.open();


                    //this._setStatus1ToDraft();

                }).catch(error => {
                    BusyIndicator.hide();
                    MessageBox.error("Failed to load dialog: " + error.message);
                });
            } else {
                //this.settBindingContext();
                try {
                    await this._setDefaultValuesRead(oPCert);
                    this._setFileUploader(oPCert);
                    BusyIndicator.hide();
                    this._paramDialog.open();
                    //this._setStatus1ToDraft();
                } catch (error) {
                    BusyIndicator.hide();
                    MessageBox.error("Failed to load data: " + error.message);
                }


            }
            //this._setFileUploader(oPCert);

        },

        _setStatus1ToDraft() {
            var oSmartField = Fragment.byId("PCInputFrag", "PCStatus");
            if (oSmartField.getValue() === "1")
                oSmartField.setValue("Draft");
        },
        _setStatusDraftTo1() {
            var oSmartField = Fragment.byId("PCInputFrag", "PCStatus");
            if (oSmartField.getValue() === "Draft")
                oSmartField.setValue("1");
        },

        onCloseDialog: function (oEvent) {
            var oModel = this.getView().getModel();
            var oForm = Fragment.byId("PCInputFrag", "SmartForm");

            oModel.resetChanges();
            if (oForm) {
                oForm.unbindElement();
            }
            oModel.refresh();
            this._paramDialog.close();
            this._paramDialog.destroy();
            this._paramDialog = null;
            
            // Clear stored binding info
            this._oSmartFormBindingContext = null;
            this._sSmartFormBindingPath = null;
            this._sSmartFormBindingMode = null;

        },
        createPayCert: function (oEvent) {
            var oForm = Fragment.byId("PCInputFrag", "SmartForm");
            Promise.resolve(oForm.check()).then(function (aErrors) {
                if (aErrors && aErrors.length > 0) {
                    MessageBox.error("Please fill in all mandatory fields.");
                    return;
                }

                // Validate CurrentInfoTable inputs
                if (!this._validateCurrentInfoTable()) {
                    MessageBox.error("Please correct the invalid values in the Current Payment Information table.");
                    return;
                }

                BusyIndicator.show();

                var oNew = this._getAllData();
                oNew.PCStatus = "1";
                var that = this;
                var oModel = this.getView().getModel();

                oModel.create('/PaymentCertificate', oNew, {
                    success: function (oData, response) {
                        MessageBox.success("Payment Certificate Created", {
                            onClose: (oEvent) => {
                                that.onCloseDialog(oEvent);
                            }

                        });

                        BusyIndicator.hide();
                    },
                    error: (oError) => {
                        var that = this;
                        MessageBox.error(
                            that._getErrorMessageFromOdataError(oError), {
                            icon: MessageBox.Icon.Error,
                            title: "Error",
                        }
                        );
                        BusyIndicator.hide();
                    }
                });
            }.bind(this));
        },
        _getAllData() {

            var oModel = this.getView().getModel();
            var oForm = Fragment.byId("PCInputFrag", "SmartForm");
            this._setStatusDraftTo1();
            var oData = oForm.getBindingContext().getObject();
            delete oData.__metadata

            var oOrigContractModel = this.getView().getModel('OrigContract');
            var oCuml2DateModelModel = this.getView().getModel('Cuml2Date');
            var oCurrModel = this.getView().getModel('CurrModel');
            var oRemarksModel = this.getView().getModel('Remarks');

            this._convertToSAPCurrFormat(oOrigContractModel);
            this._convertToSAPCurrFormat(oCuml2DateModelModel);
            this._convertToSAPCurrFormat(oCurrModel);

            var oOrigContract = oOrigContractModel.getData();
            var oCuml2DateModel = oCuml2DateModelModel.getData();
            var oCurrent = oCurrModel.getData();
            var oRemarks = oRemarksModel.getData();


            const oNew = { ...oData, ...oOrigContract, ...oCurrent, ...oRemarks, ...oCuml2DateModel };
            return oNew;

        },
        _getErrorMessageFromOdataError: function (oError) {
            if (!oError.responseText)
                return oError;
            try {
                return JSON.parse(oError.responseText).error.message.value;
            } catch (e) {
                return oError.responseText;
            }

        },
        calcCurrentModel: function (InputField) {
            // Calculate Models When user enter values manually

            var oPrevCumlModel = this.getView().getModel('PrevCuml');
            var oCuml2DateModel = this.getView().getModel('Cuml2Date');
            var oCurrModel = this.getView().getModel('CurrModel');
            var oCuml2DateModelBackEnd = this.getView().getModel('Cuml2DateBackEnd');
            var oConstants = this.getView().getModel('Constants');

            // Determine if this is an update scenario based on Mode model
            var isUpdateScenario = this.getView().getModel('Mode').getProperty('/IsUpdatable');
            
            // Check if this is an excluded company code (reverse calculation mode)
            var isExcludedCompanyCode = this.getView().getModel('Mode').getProperty('/IsExcludedCompanyCode');

            if (isExcludedCompanyCode) {
                // REVERSE CALCULATION: Cumulative = Previous + Current
                // User edits Current field, Cumulative is calculated
                // BUT: Retention/VAT percentages are still applied on CUMULATIVE values (business logic consistency)
                
                // STEP 1: Calculate Cumulative from Previous + Current for BASIC fields
                if (!isNaN(oCurrModel.getProperty("/PCWipAm")))
                    oCuml2DateModel.setProperty('/PCCdWipAm', Number(oPrevCumlModel.getProperty("/PCPcMWi")) + Number(oCurrModel.getProperty("/PCWipAm")));
                if (!isNaN(oCurrModel.getProperty("/PCVarAd1")))
                    oCuml2DateModel.setProperty('/PCCdVarAd1', Number(oPrevCumlModel.getProperty("/PCPCmVAd")) + Number(oCurrModel.getProperty("/PCVarAd1")));
                if (!isNaN(oCurrModel.getProperty("/PCVaRom1")))
                    oCuml2DateModel.setProperty('/PCCdVarOm1', Number(oPrevCumlModel.getProperty("/PCPCmVOm")) + Number(oCurrModel.getProperty("/PCVaRom1")));
                if (!isNaN(oCurrModel.getProperty("/PCMatOns")))
                    oCuml2DateModel.setProperty('/PCCdmatOns', Number(oPrevCumlModel.getProperty("/PCPCmMtOn")) + Number(oCurrModel.getProperty("/PCMatOns")));
                if (!isNaN(oCurrModel.getProperty("/PCMatRec")))
                    oCuml2DateModel.setProperty('/PCCdMatRec', Number(oPrevCumlModel.getProperty("/PCPCmMtRec")) + Number(oCurrModel.getProperty("/PCMatRec")));
                if (!isNaN(oCurrModel.getProperty("/PCAdvPym")))
                    oCuml2DateModel.setProperty('/PCCdAdvPym', Number(oPrevCumlModel.getProperty("/PCPCmAdvPy")) + Number(oCurrModel.getProperty("/PCAdvPym")));
                if (!isNaN(oCurrModel.getProperty("/PCAdvPymRec")))
                    oCuml2DateModel.setProperty('/PCCdAdvPymRec', Number(oPrevCumlModel.getProperty("/PCPCmAdvRec")) + Number(oCurrModel.getProperty("/PCAdvPymRec")));
                if (!isNaN(oCurrModel.getProperty("/PCRevRet")))
                    oCuml2DateModel.setProperty('/PCCdRevRet', Number(oPrevCumlModel.getProperty("/PCPCmRetRel")) + Number(oCurrModel.getProperty("/PCRevRet")));
                if (!isNaN(oCurrModel.getProperty("/PCContDed")))
                    oCuml2DateModel.setProperty('/PCCdContDed', Number(oPrevCumlModel.getProperty("/PCPCmContDed")) + Number(oCurrModel.getProperty("/PCContDed")));

                // STEP 2: Calculate Total Work Completed on CUMULATIVE (same as normal mode)
                // Skip if user manually entered Current Total Work Completed
                if (InputField !== 'PCTotComp') {
                    var PCCdTotComp = Number(oCuml2DateModel.getProperty("/PCCdWipAm"))
                        + Number(oCuml2DateModel.getProperty("/PCCdVarAd1"))
                        - Number(oCuml2DateModel.getProperty("/PCCdVarOm1"))
                        + Number(oCuml2DateModel.getProperty("/PCCdmatOns"))
                        - Number(oCuml2DateModel.getProperty("/PCCdMatRec"));
                    oCuml2DateModel.setProperty('/PCCdTotComp', PCCdTotComp);
                    // Derive Current from Cumulative
                    oCurrModel.setProperty('/PCTotComp', Number(oCuml2DateModel.getProperty("/PCCdTotComp")) - Number(oPrevCumlModel.getProperty("/PCPCmTotComp")));
                } else {
                    // User manually entered Current, calculate Cumulative from it
                    oCuml2DateModel.setProperty('/PCCdTotComp', Number(oPrevCumlModel.getProperty("/PCPCmTotComp")) + Number(oCurrModel.getProperty("/PCTotComp")));
                }

                // STEP 3: Calculate Retention on CUMULATIVE (same as normal mode)
                // Skip if user manually entered Current or Cumulative Retention OR if update scenario with existing value
                var shouldCalculateLessRetExcl = InputField !== 'PCLessRet' && InputField !== 'PCCdLessRet' &&
                    (!isUpdateScenario || !oCuml2DateModelBackEnd.getProperty("/PCCdLessRet") ||
                        oCuml2DateModelBackEnd.getProperty("/PCCdLessRet") === "0.00");
                if (shouldCalculateLessRetExcl) {
                    // Apply retention percentage on CUMULATIVE base (same logic as normal mode)
                    var PCCdLessRetBase = Number(oCuml2DateModel.getProperty("/PCCdWipAm"))
                        + Number(oCuml2DateModel.getProperty("/PCCdVarAd1"))
                        - Number(oCuml2DateModel.getProperty("/PCCdVarOm1"))
                        + Number(oCuml2DateModel.getProperty("/PCCdmatOns"))
                        - Number(oCuml2DateModel.getProperty("/PCCdMatRec"));

                    var RETPC = oConstants.getProperty('/RETPC');
                    var RETTP = oConstants.getProperty('/RETTP');

                    if (RETPC) {
                        oCuml2DateModel.setProperty('/PCCdLessRet', RETPC * PCCdLessRetBase);
                        // Derive Current from Cumulative
                        oCurrModel.setProperty('/PCLessRet', Number(oCuml2DateModel.getProperty("/PCCdLessRet")) - Number(oPrevCumlModel.getProperty("/PCPCmRetHld")));
                    } else if (RETTP) {
                        oCuml2DateModel.setProperty('/PCCdLessRet', RETTP * PCCdLessRetBase);
                        // Derive Current from Cumulative
                        oCurrModel.setProperty('/PCLessRet', Number(oCuml2DateModel.getProperty("/PCCdLessRet")) - Number(oPrevCumlModel.getProperty("/PCPCmRetHld")));
                    }
                } else if (!isUpdateScenario || !oCuml2DateModelBackEnd.getProperty("/PCCdLessRet") ||
                        oCuml2DateModelBackEnd.getProperty("/PCCdLessRet") === "0.00") {
                    // User manually entered Current Retention, calculate Cumulative from it
                    // Only if NOT an update scenario with existing backend value
                    if (!isNaN(oCurrModel.getProperty("/PCLessRet")))
                        oCuml2DateModel.setProperty('/PCCdLessRet', Number(oPrevCumlModel.getProperty("/PCPCmRetHld")) + Number(oCurrModel.getProperty("/PCLessRet")));
                }
                // If update scenario with existing value and user manually entered, do nothing - keep both values as-is

                // STEP 4: Calculate Net Amount Certified on CUMULATIVE (same as normal mode)
                // Skip if user manually entered Current Net Amount
                if (InputField !== 'PCNetCer') {
                    var PCCdNetCer = Number(oCuml2DateModel.getProperty("/PCCdTotComp"))
                        + Number(oCuml2DateModel.getProperty("/PCCdAdvPym"))
                        - Number(oCuml2DateModel.getProperty("/PCCdAdvPymRec"))
                        - Number(oCuml2DateModel.getProperty("/PCCdLessRet"))
                        + Number(oCuml2DateModel.getProperty("/PCCdRevRet"))
                        - Number(oCuml2DateModel.getProperty("/PCCdContDed"));
                    oCuml2DateModel.setProperty('/PCCdNetCer', PCCdNetCer);
                    // Derive Current from Cumulative
                    oCurrModel.setProperty('/PCNetCer', Number(oCuml2DateModel.getProperty("/PCCdNetCer")) - Number(oPrevCumlModel.getProperty("/PCPCmNetCer")));
                } else {
                    // User manually entered Current Net Amount, calculate Cumulative from it
                    oCuml2DateModel.setProperty('/PCCdNetCer', Number(oPrevCumlModel.getProperty("/PCPCmNetCer")) + Number(oCurrModel.getProperty("/PCNetCer")));
                }

                // STEP 5: Calculate VAT on CUMULATIVE (same as normal mode)
                // Skip if user manually entered Current VAT OR if update scenario with existing value
                var shouldCalculateTaxExcl = InputField !== 'PCTax' &&
                    (!isUpdateScenario || !oCuml2DateModelBackEnd.getProperty("/PCCdTax") ||
                        oCuml2DateModelBackEnd.getProperty("/PCCdTax") === "0.00");
                if (shouldCalculateTaxExcl) {
                    var TAXPCT = oConstants.getProperty('/TAXPCT');
                    if (TAXPCT) {
                        // Apply VAT percentage on CUMULATIVE Net Amount (same logic as normal mode)
                        var PCCdTax = Number(oCuml2DateModel.getProperty("/PCCdNetCer")) * TAXPCT;
                        oCuml2DateModel.setProperty('/PCCdTax', PCCdTax);
                        // Derive Current from Cumulative
                        oCurrModel.setProperty('/PCTax', Number(oCuml2DateModel.getProperty("/PCCdTax")) - Number(oPrevCumlModel.getProperty("/PCPCmVat")));
                    }
                } else {
                    // User manually entered Current VAT, calculate Cumulative from it
                    if (!isNaN(oCurrModel.getProperty("/PCTax")))
                        oCuml2DateModel.setProperty('/PCCdTax', Number(oPrevCumlModel.getProperty("/PCPCmVat")) + Number(oCurrModel.getProperty("/PCTax")));
                }

                // STEP 6: Calculate Total Payable (always calculate on Cumulative, derive Current)
                oCuml2DateModel.setProperty('/PCCdTotPay', Number(oCuml2DateModel.getProperty("/PCCdTax")) + Number(oCuml2DateModel.getProperty('/PCCdNetCer')));
                oCurrModel.setProperty('/PCTotPay', Number(oCuml2DateModel.getProperty("/PCCdTotPay")) - Number(oPrevCumlModel.getProperty("/PCPCmTotPay")));

            } else {
                // NORMAL CALCULATION: Current = Cumulative - Previous
                // User edits Cumulative field, Current is calculated
                
                // Calculate Current Model from Cumulative - Previous
                if (!isNaN(oCuml2DateModel.getProperty("/PCCdWipAm")))
                    oCurrModel.setProperty('/PCWipAm', Number(oCuml2DateModel.getProperty("/PCCdWipAm")) - Number(oPrevCumlModel.getProperty("/PCPcMWi")));
                if (!isNaN(oCuml2DateModel.getProperty("/PCCdVarAd1")))
                    oCurrModel.setProperty('/PCVarAd1', Number(oCuml2DateModel.getProperty("/PCCdVarAd1")) - Number(oPrevCumlModel.getProperty("/PCPCmVAd")));
                if (!isNaN(oCuml2DateModel.getProperty("/PCCdVarOm1")))
                    oCurrModel.setProperty('/PCVaRom1', Number(oCuml2DateModel.getProperty("/PCCdVarOm1")) - Number(oPrevCumlModel.getProperty("/PCPCmVOm")));
                if (!isNaN(oCuml2DateModel.getProperty("/PCCdmatOns")))
                    oCurrModel.setProperty('/PCMatOns', Number(oCuml2DateModel.getProperty("/PCCdmatOns")) - Number(oPrevCumlModel.getProperty("/PCPCmMtOn")));
                if (!isNaN(oCuml2DateModel.getProperty("/PCCdMatRec")))
                    oCurrModel.setProperty('/PCMatRec', Number(oCuml2DateModel.getProperty("/PCCdMatRec")) - Number(oPrevCumlModel.getProperty("/PCPCmMtRec")));
                if (!isNaN(oCuml2DateModel.getProperty("/PCCdTotComp")))
                    oCurrModel.setProperty('/PCTotComp', Number(oCuml2DateModel.getProperty("/PCCdTotComp")) - Number(oPrevCumlModel.getProperty("/PCPCmTotComp")));
                if (!isNaN(oCuml2DateModel.getProperty("/PCCdAdvPym")))
                    oCurrModel.setProperty('/PCAdvPym', Number(oCuml2DateModel.getProperty("/PCCdAdvPym")) - Number(oPrevCumlModel.getProperty("/PCPCmAdvPy")));
                if (!isNaN(oCuml2DateModel.getProperty("/PCCdAdvPymRec")))
                    oCurrModel.setProperty('/PCAdvPymRec', Number(oCuml2DateModel.getProperty("/PCCdAdvPymRec")) - Number(oPrevCumlModel.getProperty("/PCPCmAdvRec")));
                if (!isNaN(oCuml2DateModel.getProperty("/PCCdLessRet")))
                    oCurrModel.setProperty('/PCLessRet', Number(oCuml2DateModel.getProperty("/PCCdLessRet")) - Number(oPrevCumlModel.getProperty("/PCPCmRetHld")));
                if (!isNaN(oCuml2DateModel.getProperty("/PCCdRevRet")))
                    oCurrModel.setProperty('/PCRevRet', Number(oCuml2DateModel.getProperty("/PCCdRevRet")) - Number(oPrevCumlModel.getProperty("/PCPCmRetRel")));
                if (!isNaN(oCuml2DateModel.getProperty("/PCCdContDed")))
                    oCurrModel.setProperty('/PCContDed', Number(oCuml2DateModel.getProperty("/PCCdContDed")) - Number(oPrevCumlModel.getProperty("/PCPCmContDed")));
                if (!isNaN(oCuml2DateModel.getProperty("/PCCdNetCer")))
                    oCurrModel.setProperty('/PCNetCer', Number(oCuml2DateModel.getProperty("/PCCdNetCer")) - Number(oPrevCumlModel.getProperty("/PCPCmNetCer")));
                if (!isNaN(oCuml2DateModel.getProperty("/PCCdTax")))
                    oCurrModel.setProperty('/PCTax', Number(oCuml2DateModel.getProperty("/PCCdTax")) - Number(oPrevCumlModel.getProperty("/PCPCmVat")));
                if (!isNaN(oCuml2DateModel.getProperty("/PCCdTotPay")))
                    oCurrModel.setProperty('/PCTotPay', Number(oCuml2DateModel.getProperty("/PCCdTotPay")) - Number(oPrevCumlModel.getProperty("/PCPCmTotPay")));

                // Calculate Total Work Completed (always calculate unless manually entered)
                if (InputField !== 'PCCdTotComp') {
                    var PCCdTotComp = Number(oCuml2DateModel.getProperty("/PCCdWipAm"))
                        + Number(oCuml2DateModel.getProperty("/PCCdVarAd1"))
                        - Number(oCuml2DateModel.getProperty("/PCCdVarOm1"))
                        + Number(oCuml2DateModel.getProperty("/PCCdmatOns"))
                        - Number(oCuml2DateModel.getProperty("/PCCdMatRec"));
                    oCuml2DateModel.setProperty('/PCCdTotComp', PCCdTotComp);
                    oCurrModel.setProperty('/PCTotComp', Number(oCuml2DateModel.getProperty("/PCCdTotComp")) - Number(oPrevCumlModel.getProperty("/PCPCmTotComp")));
                }

                // Calculate Retention (skip if manually entered OR if update scenario with existing value)
                var shouldCalculateLessRet = InputField !== 'PCCdLessRet' && InputField !== 'PCLessRet' &&
                    (!isUpdateScenario || !oCuml2DateModelBackEnd.getProperty("/PCCdLessRet") ||
                        oCuml2DateModelBackEnd.getProperty("/PCCdLessRet") === "0.00");
                if (shouldCalculateLessRet) {
                    var PCCdLessRet = Number(oCuml2DateModel.getProperty("/PCCdWipAm"))
                        + Number(oCuml2DateModel.getProperty("/PCCdVarAd1"))
                        - Number(oCuml2DateModel.getProperty("/PCCdVarOm1"))
                        + Number(oCuml2DateModel.getProperty("/PCCdmatOns"))
                        - Number(oCuml2DateModel.getProperty("/PCCdMatRec"));

                    var RETPC = oConstants.getProperty('/RETPC');
                    var RETTP = oConstants.getProperty('/RETTP');

                    if (RETPC) {
                        oCuml2DateModel.setProperty('/PCCdLessRet', RETPC * PCCdLessRet);
                        oCurrModel.setProperty('/PCLessRet', Number(oCuml2DateModel.getProperty("/PCCdLessRet")) - Number(oPrevCumlModel.getProperty("/PCPCmRetHld")));
                    } else if (RETTP) {
                        oCuml2DateModel.setProperty('/PCCdLessRet', RETTP * PCCdLessRet);
                        oCurrModel.setProperty('/PCLessRet', Number(oCuml2DateModel.getProperty("/PCCdLessRet")) - Number(oPrevCumlModel.getProperty("/PCPCmRetHld")));
                    }
                }

                // Calculate Net Amount Certified (always calculate unless manually entered)
                if (InputField !== 'PCCdNetCer') {
                    var PCCdNetCer = Number(oCuml2DateModel.getProperty("/PCCdTotComp"))
                        + Number(oCuml2DateModel.getProperty("/PCCdAdvPym"))
                        - Number(oCuml2DateModel.getProperty("/PCCdAdvPymRec"))
                        - Number(oCuml2DateModel.getProperty("/PCCdLessRet"))
                        + Number(oCuml2DateModel.getProperty("/PCCdRevRet"))
                        - Number(oCuml2DateModel.getProperty("/PCCdContDed"));

                    oCuml2DateModel.setProperty('/PCCdNetCer', PCCdNetCer);
                    oCurrModel.setProperty('/PCNetCer', Number(oCuml2DateModel.getProperty("/PCCdNetCer")) - Number(oPrevCumlModel.getProperty("/PCPCmNetCer")));
                }

                // Calculate VAT (skip if manually entered OR if update scenario with existing value)
                var shouldCalculateTax = InputField !== 'PCCdTax' &&
                    (!isUpdateScenario || !oCuml2DateModelBackEnd.getProperty("/PCCdTax") ||
                        oCuml2DateModelBackEnd.getProperty("/PCCdTax") === "0.00");
                if (shouldCalculateTax) {
                    var TAXPCT = oConstants.getProperty('/TAXPCT');
                    if (TAXPCT) {
                        var PCCdTax = Number(oCuml2DateModel.getProperty("/PCCdNetCer")) * TAXPCT;
                        oCuml2DateModel.setProperty('/PCCdTax', PCCdTax);
                        oCurrModel.setProperty('/PCTax', Number(oCuml2DateModel.getProperty("/PCCdTax")) - Number(oPrevCumlModel.getProperty("/PCPCmVat")));
                    }
                }

                // Calculate Total Payable (always calculate)
                oCuml2DateModel.setProperty('/PCCdTotPay', Number(oCuml2DateModel.getProperty("/PCCdTax")) + Number(oCuml2DateModel.getProperty('/PCCdNetCer')));
                oCurrModel.setProperty('/PCTotPay', Number(oCuml2DateModel.getProperty("/PCCdTotPay")) - Number(oPrevCumlModel.getProperty("/PCPCmTotPay")));
            }
            
            this._convertToSAPCurrFormat(oCuml2DateModel);
            this._convertToSAPCurrFormat(oCurrModel);
            this._convertToSAPCurrFormat(oPrevCumlModel);

        },
        formatCurr(curr) {
            var oCurrencyFormat = sap.ui.core.format.NumberFormat.getCurrencyInstance({
                trailingCurrencyCode: true,
                decimals: 2,
                groupingSeparator: ',', // grouping separator is '.'
                decimalSeparator: "."

            });
            var currName = this.getView().getModel('Currency').getProperty('/Name');
            return oCurrencyFormat.format(curr, currName);

            // return curr +' '+currName;
        },
        savePayCert(oEvent) {
            var oForm = Fragment.byId("PCInputFrag", "SmartForm");
            Promise.resolve(oForm.check()).then(function (aErrors) {
                if (aErrors && aErrors.length > 0) {
                    MessageBox.error("Please fill in all mandatory fields.");
                    return;
                }

                // Validate CurrentInfoTable inputs
                if (!this._validateCurrentInfoTable()) {
                    MessageBox.error("Please correct the invalid values in the Current Payment Information table.");
                    return;
                }

                BusyIndicator.show();

                var oModel = this.getView().getModel();
                var sPath = oForm.getBindingContext().getPath();
                var oUpdate = this._getAllData();
                var that = this;
                oModel.update(sPath, oUpdate, {
                    success: function (oData, response) {
                        var oPromise =  that._callTriggerWorkFlow(oUpdate);

                        oPromise.finally(function() {
                            BusyIndicator.hide();
                        });

                        MessageBox.success("Changes Saved",
                            {
                                onClose: (oEvent) => {
                                    that.onCloseDialog(oEvent);
                                }
                            }
                        );
                    },
                    error: (oError) => {
                        var that = this;
                        MessageBox.error(
                            that._getErrorMessageFromOdataError(oError), {
                            icon: MessageBox.Icon.Error,
                            title: "Error",
                        }
                        );
                        BusyIndicator.hide();
                    }
                });
            }.bind(this));
        },
        _convertToSAPCurrFormat(oModel) {
            var oData = oModel.getData();
            var Currency = this.getView().getModel('Currency').getProperty('/Name');
            var Lang = sap.ui.getCore().getConfiguration().getLanguage();
            var Formatter = sap.ui.core.format.NumberFormat.getCurrencyInstance({
                decimals: 2,
                currency: Currency,
                groupingEnabled: false,
                emptyString: null,
                decimalSeparator: "."
            }
            );
            var oLocale = new sap.ui.core.Locale("en-US");
            var oFloatFormat = sap.ui.core.format.NumberFormat.getFloatInstance(oLocale);
            Object.keys(oData).forEach(key => {
                oData[key] = Formatter.format(oData[key]);
            });
            oModel.setData(oData);

        },
        _refreshAllModels(oModel) {
            var oPrevCumlModel = this.getView().getModel('PrevCuml');
            var oCuml2DateModel = this.getView().getModel('Cuml2Date');
            var oCurrModel = this.getView().getModel('CurrModel');
            oPrevCumlModel.refresh(true);
            oCuml2DateModel.refresh(true);
            oCurrModel.refresh(true);
        },

        _setFileUploader: function (oPCert) { // like �ZMY_OBJ�
            const that = this;
            const sId = "attachmentComponentContainer";


            // Check if FileUploader does not exist yet 
            const oCurrentFileUploader = null;
            //Fragment.byId("PCInputFrag", sId).getComponent();
            //var oForm = Fragment.byId("PCInputFrag", "SmartForm");

            if (oCurrentFileUploader === null) {
                // Create Object Key
                var PCNumber = String(oPCert.PCNumber).padStart(10, '0');
                var PO = String(oPCert.PO).padStart(10, '0');
                var POItem = String(oPCert.POItem).padStart(10, '0');
                const sObjKey = PCNumber + PO + POItem;// this._generateUniqueObjectKey();
                //this._storeoTempDataKeyInModel(sObjKey);

                // Create Upload Component
                const oPromise = this.getOwnerComponent().createComponent({
                    usage: "attachmentReuseComponent",
                    settings: {
                        mode: "I",
                        objectKey: sObjKey,
                        objectType: 'ZBUSIPPMPC'
                    }
                });

                // Set upload component
                oPromise.then(function (attachmentComponent) {
                    const oAttrList = attachmentComponent.getAttributes();
                    const oUpdatedAttrList = this._prepareAttrList(oAttrList);

                    attachmentComponent.setAttributes(oUpdatedAttrList);
                    Fragment.byId("PCInputFrag", sId).setComponent(attachmentComponent);

                    // Update counter for uploading files
                    attachmentComponent
                        .page
                        .getController()
                        .getUploadCollectionControl()
                        .attachBeforeUploadStarts(
                            function (oEvent) {
                                //that.fileUploadBusyCounter++;
                            }
                        );
                }.bind(this));
            }
        },
        _prepareAttrList: function (oList) {
            // Determine visible attributes
            const aVisibleAttributes = [
                'UPLOADEDBY',
                'UPLOADEDON',
                'FILESIZE',
                'ENABLELINK',
                'ATTACHMENTSTATUS',
                'ATTACHMENTTITLE',
                'DIRDETAILS',
                'SOURCE'
            ];

            // Determine visible actions
            const aVisibleActions = ['DELETE', 'ADD'];

            // Set visible attributes
            Object.keys(oList._VisibleAttributes).forEach((sAttribute) => {
                oList._VisibleAttributes[sAttribute] = aVisibleAttributes.includes(sAttribute);
            });

            // Set visible actions
            Object.keys(oList._VisibleActions).forEach((sAction) => {
                oList._VisibleActions[sAction] = aVisibleActions.includes(sAction);
            });

            return oList;
        },
        downloadForm() {
            var oModel = this.getView().getModel();
            var oForm = Fragment.byId("PCInputFrag", "SmartForm");
            var oBindingContext = oForm.getBindingContext();

            var oPromise = this.extensionAPI.invokeActions("/DownloadFormPdf", oBindingContext, {

            })
                ;
            BusyIndicator.show();
            oPromise.then(
                (aResponse) => {
                    var opdfViewer = new PDFViewer(
                        {
                            isTrustedSource: true,
                            height: '50%',
                            displayType: 'Link'
                        }
                    );
                    this.getView().addDependent(opdfViewer);
                    BusyIndicator.hide();


                    let base64EncodedPDF = aResponse[0].response.data.DownloadFormPdf.FileStream;

                    let decodedPdfContent = atob(base64EncodedPDF);
                    let byteArray = new Uint8Array(decodedPdfContent.length);
                    for (var i = 0; i < decodedPdfContent.length; i++) {
                        byteArray[i] = decodedPdfContent.charCodeAt(i);
                    }
                    var blob = new Blob([byteArray.buffer], {
                        type: 'application/pdf'
                    });
                    var pdfurl = URL.createObjectURL(blob);
                    jQuery.sap.addUrlWhitelist("blob"); // register blob url as whitelist
                    opdfViewer.setSource(pdfurl);
                    opdfViewer.setVisible(true);

                    opdfViewer.setTitle("Payment_Certificate");
                    //console.log('Reached to PDF')
                    opdfViewer.open();

                    BusyIndicator.hide();
                },
                (oError) => {
                    BusyIndicator.hide();
                    var that = this;
                    MessageBox.error(
                        that._getErrorMessageFromOdataError(oError), {
                        icon: MessageBox.Icon.Error,
                        title: "Error",
                    })
                });
        },
        _callTriggerWorkFlow(oPCert) {
            if (oPCert.PCStatus != "2")
                return Promise.resolve();
            var oModel = this.getView().getModel();
            var oForm = Fragment.byId("PCInputFrag", "SmartForm");
            var oBindingContext = oForm.getBindingContext();

            var oPromise = this.extensionAPI.invokeActions("/TriggerWorkflow", oBindingContext, {

            });
            return oPromise;
            
        },
        onChangeCurrency: function (oEvent) {
            var oPOItem = oEvent.getSource().getBindingContext().getObject();
            this.getView().getModel('Currency').setProperty('/Name', oPOItem.DocumentCurrency.toUpperCase());
            this._refreshAllModels();
        }
    }
});
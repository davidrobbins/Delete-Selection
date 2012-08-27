
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var dataGrid1 = {};	// @dataGrid
	var button4 = {};	// @button
// @endregion// @endlock

// eventHandlers// @lock

	dataGrid1.onRowClick = function dataGrid1_onRowClick (event)// @startlock
	{// @endlock
		$$('richText4').setValue("");
	};// @lock

	button4.click = function button4_click (event)// @startlock
	{// @endlock
		//Keep an array of the IDs of the companies to delete.
		var companyIDs = WAF.sources.company.getIDs(); 
		//In the callback of the deleteSelected method we will see if any of these IDs 
		//   are returned in the collection and highlight them and inform the user.
		var selectedEntityIndexArray = $$('dataGrid1').getSelectedRows(); 
		var selectedCompanyIDs = []; 
		$.each(selectedEntityIndexArray, function() { 
			selectedCompanyIDs.push(companyIDs[this].ID);
		});
		
		WAF.sources.company.deleteSelected({
			onSuccess: function(evt) {
				WAF.sources.company.setEntityCollection(evt.result);
				//Highlight Rows of Selected Companies that could not be deleted.
				/**/
				errorRows = [];
				var companyIDs = WAF.sources.company.getIDs();
				for (var i = 0, len = companyIDs.length; i < len; i++) {
					$.each(evt.userData.selectedCompanyIDs, function() {
						if (this == companyIDs[i].ID) {
							errorRows.push(i);
						}
					});
				}
				
				//If we found some rows that did not get deleted select them
				//   and diplay message to the user.
				/**/
				if (errorRows.length > 0) { 
					$$('richText4').setValue("The highlighted companies could not be removed."); 
					
					
					WAF.sources.company.selectByKey(companyIDs[errorRows[0]].ID);
					$$('dataGrid1').setSelectedRows(errorRows);
					
					
					
				} else {
					$$('richText4').setValue("Your selection has been removed on the server.");
					$$('dataGrid1').setSelectedRows();
				}
				
			},
			userData: {selectedCompanyIDs: selectedCompanyIDs}
		},$$('dataGrid1').getSelectedRows());
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("dataGrid1", "onRowClick", dataGrid1.onRowClick, "WAF");
	WAF.addListener("button4", "click", button4.click, "WAF");
// @endregion
};// @endlock

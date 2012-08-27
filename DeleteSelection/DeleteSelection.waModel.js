
guidedModel =// @startlock
{
	Company :
	{
		events :
		{
			onRemove:function()
			{// @endlock
				var sessionRef = currentSession(); // Get session.
				if (!sessionRef.belongsTo("Admin")) {
					//Don't delete a company with employees unless you are Admin.
					if (this.employees.length > 0) {
						return {error: 100, errorMessage: "You cannot delete a Company that still has employees."};
					}
				}
			}// @startlock
		},
		collectionMethods :
		{// @endlock
			getIDs:function()
			{// @lock
				var companyIDs = this.toArray("ID");
				return companyIDs;
			},// @lock
			deleteSelected:function(theSelectedRows)
			{// @lock
				//this contains our current company collection.
				var currentCompanyCollection = this;
				//Create two empty collections.
				var deleteCollection = ds.Company.createEntityCollection(); 
				var xDeleteCollection = ds.Company.createEntityCollection();
				//Iterate through the selected rows passed in from the client
				//to populate the delete collection.
				theSelectedRows.forEach(function(rowNum) { //create delete collection
					deleteCollection.add(currentCompanyCollection[rowNum]);
				});
				//Remove selected companies - if rejected add to our 
				// xDelete collection.	
				theSelectedRows.forEach(function(rowNum) {
					okToAddToDeleteCollection = true;
					try
					{
					    currentCompanyCollection[rowNum].remove();
					}
					catch (err)
					{
					    xDeleteCollection.add(currentCompanyCollection[rowNum]);
					}
				});
				//The delete collection minus the rejected delete requests.
				var validDeleteCollection = deleteCollection.minus(xDeleteCollection);
				//Return our updated company collection.
				return currentCompanyCollection.minus(validDeleteCollection);	
			}// @startlock
		}
	}
};// @endlock

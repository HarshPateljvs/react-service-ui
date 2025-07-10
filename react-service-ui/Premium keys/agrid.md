https://stackblitz.com/edit/ag-grid-react-packages-license-manager-fef2dx

import React from 'react';
import { render } from 'react-dom';
import React, { useState } from 'react';

//importing AG Grid dependencies
import 'ag-grid-enterprise';
import { LicenseManager } from 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';

//please asign your license key to the licenseKey constant as a string below
const licenseKey =
  'CompanyName=Equinix Asia Pacific pte ltd,LicensedGroup=equinixMendixPrivateLib,LicenseType=MultipleApplications,LicensedConcurrentDeveloperCount=2,LicensedProductionInstancesCount=0,AssetReference=AG-027567,SupportServicesEnd=18_June_2023_[v2]_MTY4NzA0MjgwMDAwMA==4be2c388f9a8a7443c72842dff53d5b2';
LicenseManager.setLicenseKey(licenseKey);
//please asign your license key to the licenseKey constant as a string above

const App = () => {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [rowData, setRowData] = useState([
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Boxter', price: 72000 },
  ]);

  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);

    params.api.getDisplayedRowAtIndex(0).setExpanded(true);
  };

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
      <AgGridReact
        defaultColDef={{
          flex: 1,
          minWidth: 100,
          sortable: true,
          resizable: true,
        }}
        // groupDefaultExpanded="1"
        autoGroupColumnDef={{ minWidth: 200, headerName: 'Make' }}
        animateRows={true}
        onGridReady={onGridReady}
        rowData={rowData}
      >
        <AgGridColumn field="make" rowGroup={true} hide={true}></AgGridColumn>
        <AgGridColumn field="model"></AgGridColumn>
        <AgGridColumn field="price"></AgGridColumn>
      </AgGridReact>
    </div>
  );
};

render(<App />, document.getElementById('root'));

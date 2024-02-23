import React from 'react';
import './EnvironmentTable.css'; // Import CSS file for table styling

function EnvironmentTable() {
    
    return (
        <div className="tables-container">
            <div className="table-wrapper2 new-requests">
                <h2 className='table-title'>Environment List</h2>
                <table className="environment-table">
                    <thead>
                        <tr>
                            <th>Environment ID</th>
                            <th>Environment name</th>
                            <th>Environment Type</th>
                            <th>Date Created</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* No data rows */}
                        <tr>
                            <td colSpan="5">No data available</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="table-wrapper2 new-requests"> {/* Add new-requests class here */}
                <h2>Request Status</h2>
                <table className="environment-table">
                    <thead>
                        <tr>
                            <th>Request ID</th>
                            <th>Request Details</th>
                            <th>Approval Status</th>
                            <th>Request Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* No data rows */}
                        <tr>
                            <td colSpan="4">No new requests</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default EnvironmentTable;

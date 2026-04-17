// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getAllInvoices, deleteInvoice } from "../../features/invoiceAction";
// import Loader from "../layout/Loader/Loader";
// import "./AdminOrders.css";
// import { Invoicepdf } from "../../Utils/Invoicepdf"; // similar to Orderpdf

// export default function InvoiceList() {
//   const dispatch = useDispatch();
//   const { invoices, loading, error } = useSelector((state) => state.invoice);

//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
//   const [deleteId, setDeleteId] = useState(null);

//   useEffect(() => {
//     dispatch(getAllInvoices());
//   }, [dispatch]);

//   const handleDelete = (id) => {
//     setDeleteId(id);
//     setShowDeleteConfirm(true);
//   };

//   const confirmDelete = () => {
//     if (deleteId) {
//       dispatch(deleteInvoice(deleteId)).then(() => {
//         dispatch(getAllInvoices()); // refresh after delete
//         setShowDeleteConfirm(false);
//         setDeleteId(null);
//       });
//     }
//   };

//   if (loading) return <Loader />;
//   if (error) return <p className="error">{error}</p>;

//   return (
//     <div className="invoiceContainer">
//       <h2>🧾 All Invoices</h2>
//       {invoices && invoices.length > 0 ? (
//         <table className="invoiceTable">
//           <thead>
//             <tr>
//               <th>Invoice No</th>
//               <th>Customer</th>
//               <th>Date</th>
//               <th>Amount</th>
//               <th>Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {invoices.map((invoice) => (
//               <tr key={invoice._id}>
//                 <td>{invoice.invoiceNumber}</td>
//                 <td>{invoice.customer?.name || "Guest"}</td>
//                 <td>
//                   {new Date(invoice.createdAt).toLocaleDateString("en-IN", {
//                     day: "2-digit",
//                     month: "short",
//                     year: "numeric",
//                   })}
//                 </td>
//                 <td>₹{invoice.totalAmount}</td>
//                 <td>
//                   <span
//                     className={`statusBadge ${
//                       invoice.status === "Paid"
//                         ? "paid"
//                         : invoice.status === "Pending"
//                         ? "pending"
//                         : "overdue"
//                     }`}
//                   >
//                     {invoice.status}
//                   </span>
//                 </td>
//                 <td className="actions">
//                   <button
//                     className="btn blue"
//                     onClick={() => Invoicepdf(invoice, "download")}
//                   >
//                     Download
//                   </button>
//                   <button
//                     className="btn green"
//                     onClick={() => Invoicepdf(invoice, "print")}
//                   >
//                     Print
//                   </button>
//                   <button
//                     className="btn red"
//                     onClick={() => handleDelete(invoice._id)}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p>No invoices found</p>
//       )}

//       {/* Delete Confirmation */}
//       {showDeleteConfirm && (
//         <div className="modalOverlay">
//           <div className="modalContent">
//             <h3>⚠️ Confirm Delete</h3>
//             <p>Are you sure you want to delete this invoice?</p>
//             <div className="modalActions">
//               <button className="danger" onClick={confirmDelete}>
//                 Yes, Delete
//               </button>
//               <button onClick={() => setShowDeleteConfirm(false)}>Cancel</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import React from 'react'

export default function InvoiceList() {
  return (
    <div>
      Invoice Grid
    </div>
  )
}


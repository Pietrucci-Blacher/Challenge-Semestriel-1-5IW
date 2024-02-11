import React, { useEffect, useState } from 'react';
import useRequestsProvider from '@/hooks/useRequestsProvider';
import { useToast } from '@/hooks/useToast';


export default function Index() {
  const { requests, getListOfRequests, approveRequest, declineRequest } = useRequestsProvider();
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { createToastMessage } = useToast();


  useEffect(() => {
    getListOfRequests();
  }, [getListOfRequests]);

  const showPopup = (message) => {
    alert(message);
  };

  const openPopup = (request) => {
    const popupWindow = window.open('', '_blank', 'width=600,height=600');
    if (popupWindow) {
      popupWindow.document.write(`
        <html>
          <head>
            <title>Détails de la demande</title>
          </head>
          <body>
            <h2>Détails de la demande</h2>
            <p>ID: ${request.id}</p>
            <p>Status: ${request.status}</p>
            <p>KBIS: ${request.kbis}</p>
            <p>File Path: <a href="${request.filePath}" download>Download</a></p>
            <p>Created At: ${formatDate(request.createdAt)}</p>
            <p>Created By: ${`${request.createdBy.firstname} ${request.createdBy.lastname} (${request.createdBy.email})`}</p>
            <!-- Ajoutez d'autres données de demande si nécessaire -->
          </body>
        </html>
      `);
    } else {
      alert('La fenêtre popup a été bloquée par le navigateur. Veuillez autoriser les popups pour voir les détails.');
    }
  };

  const handleApprove = async (id) => {
    try {
      await approveRequest({ id });
      getListOfRequests(); // Actualiser la liste des demandes après approbation
    //   showPopup('La demande a été approuvée avec succès.');
      createToastMessage('success', 'La demande a été approuvée avec succès.');
    } catch (error) {
      console.error('Erreur lors de l\'approbation de la demande:', error);
    //   showPopup('Erreur lors de l\'approbation de la demande. Veuillez réessayer.');
      createToastMessage('error', 'Erreur lors de l\'approbation de la demande. Veuillez réessayer.');
    }
  };

  const handleDecline = async (id) => {
    try {
      await declineRequest({ id });
      getListOfRequests(); // Actualiser la liste des demandes après rejet
      showPopup('La demande a été rejetée avec succès.');
    } catch (error) {
      console.error('Erreur lors du rejet de la demande:', error);
      showPopup('Erreur lors du rejet de la demande. Veuillez réessayer.');
    }
  };

  // Fonction pour formater la date
  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  return (
    <div>
      <h1>Toutes les demandes pour devenir prestataire</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Status</th>
            <th>KBIS</th>
            <th>File Path</th>
            <th>Created At</th>
            <th>Created By</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request.id}>
              <td>{request.id}</td>
              <td>{request.status}</td>
              <td>{request.kbis}</td>
              <td>{request.filePath}</td>            
              <td>{formatDate(request.createdAt)}</td>
              <td>{`${request.createdBy.firstname} ${request.createdBy.lastname} (${request.createdBy.email})`}</td>
              <td>
                <button onClick={() => openPopup(request)}>Voir</button>
                <button onClick={() => handleApprove(request.id)}>Accepter</button>
                <button onClick={() => handleDecline(request.id)}>Rejeter</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

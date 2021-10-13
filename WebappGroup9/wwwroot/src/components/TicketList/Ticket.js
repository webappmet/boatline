const Ticket = ({ ticket }) => {
    return (
        <div className="ticket-display">
            <div className="ticket-info-container">
                <div className="ticket-info-header">
                    <h2>BoatLine</h2>
                    <p><span class="bold">Ref:</span> {ticket.reference}</p>
                </div>
                <div className="ticket-info-list">
                    <div>
                        <h3 className="no-margin">Traveler:</h3>
                        <p className="no-margin">{ticket.firstName} {ticket.lastName}</p>
                    </div>
                    <div>
                        <h3 className="no-margin">Date:</h3>
                        <p className="no-margin">{ticket.date} - {ticket.durationDays}D, {ticket.durationHours}H</p>
                    </div>
                    <div>
                        <h3 className="no-margin">Departure:</h3>
                        <p className="no-margin">{ticket.route.departure}</p>
                    </div>
                    <div>
                        <h3 className="no-margin">Destination:</h3>
                        <p className="no-margin">{ticket.route.destination}</p>
                    </div>
                    <div>
                        <h3 className="no-margin">Cabin:</h3>
                        <p className="no-margin">{ticket.cabin.id} - {ticket.cabin.type}</p>
                    </div>
                </div>
            </div>
            <div className="qr-code-container">
                <img className="qr-image" src="./qr.png" alt="qr-code" />
            </div>
        </div>
    );
}

export default Ticket;
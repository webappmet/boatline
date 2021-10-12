import { useEffect } from "react";
import { useState } from "react/cjs/react.development";

const SelectedCabin = ({ cabin }) => {

    const Render = () => {
        return (
            <div className="selected-cabin">
                <div className="cabin-stats">
                    <div className="cabin-stat">
                        <p className="selected-cabin-text bold">Room Number:</p>
                        <p className="selected-cabin-text">{cabin.id}</p>
                    </div>
                    <div className="cabin-stat">
                        <p className="selected-cabin-text bold">Cabin Class:</p>
                        <p className="selected-cabin-text">{cabin.type}</p>
                    </div>
                    <div className="cabin-stat">
                        <p className="selected-cabin-text bold">Beds:</p>
                        <p className="selected-cabin-text">{cabin.beds}</p>
                    </div>
                    <div className="cabin-stat">
                        <p className="selected-cabin-text bold">Price:</p>
                        <p className="selected-cabin-text">{cabin.price},-</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>{cabin ? (<Render />) : ''}</div>
    );
}

export default SelectedCabin;
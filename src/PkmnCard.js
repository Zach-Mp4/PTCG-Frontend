import React, {useState, useEffect} from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import Api from "./Api";

function PkmnCard({data, onClick}){
    return (
        <section className="pkmn-card-container">
          <Card id={data.name} onClick={onClick}>
            <img id={data.id} src={data.images.small}></img>
          </Card>
        </section>
      );
}

export default PkmnCard;
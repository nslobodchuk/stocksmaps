
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import {useEffect, useState} from 'react';
import Spinner from 'react-bootstrap/Spinner';

const Subscribe = ({idProp}) => {

	const [loading, setLoading] = useState(false);

    useEffect(() => {
    	setLoading(true);
        const script = document.createElement('script');
        script.src='https://js.hsforms.net/forms/v2.js';
        document.body.appendChild(script);

        script.addEventListener('load', () => {
        	setLoading(false);
            // @TS-ignore
            if (window.hbspt) {
                // @TS-ignore
                window.hbspt.forms.create({
    										region: "na1",
										    portalId: "21983283",
										    formId: "88594a60-4ab9-478d-9c8e-19fc31f6c090",
										    target: '#hubspotForm'+idProp
										  })
								}
        });
    }, []);

    return (
    	<Container>

        <Row>
        <Col lg={3}/>
        <Col lg={6}>
            {loading?<Spinner animation="border"/>:<div id={"hubspotForm"+idProp}></div>}
            </Col>
            <Col lg={3}/>
         </Row>
         </Container>

    );

}

export default Subscribe;


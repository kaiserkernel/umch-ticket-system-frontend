import React from "react";
import styles from "./mobileFooter.module.css";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faTiktok, faYoutube, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faChevronUp } from "@fortawesome/free-solid-svg-icons";

const MobileFooter: React.FC = () => {
    return (
        <div className={`${styles.bgDark} pt-4 text-white`}>
            <Container>
                <Row className="pb-5">
                    <Col xs={12} className="text-center mb-5">
                        <a href="#" className="text-white link-underline link-underline-opacity-0">
                            <FontAwesomeIcon icon={faChevronUp} className="fa-sm fw-light" width={18} />
                            <p className="text-white">
                                Nach Oben
                            </p>
                        </a>
                    </Col>
                    <Col xs={12}>
                        <div className="d-flex flex-column">
                            <img src="/logos/umch_blanco-opt.webp" className="w-75 mb-4" />
                            <div className={`${styles.mobileFooterFontSize} text-white w-75`}>
                                Universitätsmedizin Neumarkt
                                am Mieresch Campus Hamburg
                            </div>
                        </div>
                    </Col>
                    <Col xs={12} className="py-4">
                        <ul className={`${styles.mobileFooterFontSize} list-unstyled`}>
                            <li>Albert-Einstein-Ring 11-15</li>
                            <li>22761 Hamburg, Deutschland</li>
                            <li>Tel.: +49 (0) 40-2093485-00</li>
                            <li>Fax.: +49 (0) 40-2093485-09</li>
                            <li>E-Mail: info@edu.umch.de</li>
                        </ul>
                    </Col>
                    <Col xs={12} className="mb-3">
                        <p className={`${styles.mobileFooterFontSize} text-white`}>Eine Niederlassung der</p>
                    </Col>
                    <Col xs={12}>
                        <div className="d-flex flex-column">
                            <img src="/logos/umfst-logo-neu_whiteENG-01-1-768x231.webp" className="w-75 mb-4" />
                            <div className={`${styles.mobileFooterFontSize} text-white w-75`}>
                                Universität für Medizin, Pharmazie,
                                Naturwissenschaften und Technik
                                Neumarkt am Mieresch
                            </div>
                        </div>
                    </Col>
                    <Col xs={12}>
                        <ul className={`${styles.mobileFooterFontSize} list-unstyled mt-4`}>
                            <li>Gheorghe Marinescu, 38</li>
                            <li>540139 Neumarkt am Mieresch, Rumänien</li>
                            <li>Tel.: +40 (0) 265-215-551</li>
                            <li>Fax.: +40 (0) 265-210-407</li>
                            <li>E-Mail: administrativ@umftgm.ro</li>
                        </ul>
                    </Col>
                    <Col xs={12} className="py-4">
                        <Row>
                            <Col sm={5} xs={6}>
                                <div className="text-start fw-medium">
                                    <a href="#" className={`${styles.mobileFooterFontSize} d-block text-white link-underline link-underline-opacity-0`}>Impressum</a>
                                    <a href="#" className={`${styles.mobileFooterFontSize} d-block text-white link-underline link-underline-opacity-0`}>Datenschutz</a>
                                </div>
                                <ul className="list-group list-unstyled list-group-horizontal text-start justify-content-between" style={{ marginTop: 45 }}>
                                    <li>
                                        <a href="#" className="list-group-item text-white bg-transparent border-0 fa-xl ps-0">
                                            <FontAwesomeIcon icon={faInstagram} className={styles.socialMediaSize} />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="list-group-item text-white bg-transparent border-0 fa-xl ps-0">
                                            <FontAwesomeIcon icon={faTiktok} className={styles.socialMediaSize} />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="list-group-item text-white bg-transparent border-0 fa-xl ps-0">
                                            <FontAwesomeIcon icon={faFacebook} className={styles.socialMediaSize} />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="list-group-item text-white bg-transparent border-0 fa-xl ps-0">
                                            <FontAwesomeIcon icon={faYoutube} className={styles.socialMediaSize} />
                                        </a>
                                    </li>
                                </ul>
                            </Col>
                            <Col xs={5} className="mt-3">
                                <img src="/bilder/Samy_Hoddie_outline_EU_Flag.webp" className="mb-4" height={110} />
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={12} className="d-flex">
                        <div className={`${styles.mobileFooterFontSize} text-start fw-medium`}>
                            <div className="mb-0">George Emil Palade</div>
                            <div className="mb-0">Nobelpreisgewinner</div>
                            <div className="mb-0">und Namensgeber</div>
                            <div>der Universität</div>
                        </div>
                        <img src="/logos/Medaille.webp" className="ms-4" width={92} height={92} alt="" />
                    </Col>
                    <Col xs={12}>
                        <hr className="opacity-100 border-light mt-4" />
                        <div className="text-start my-4">
                            <a href="#" className={`${styles.mobileFooterFontSize} pe-4 text-white link-underline link-underline-opacity-0`}>DE</a>
                            <a href="#" className={`${styles.mobileFooterFontSize} text-white link-underline link-underline-opacity-0`}>ENG</a>
                        </div>
                    </Col>
                    <Col xs={12}>
                        <div className={`${styles.mobileFooterSubFontSize} d-inline text-start w-50`}>
                            @2024 – UMCH – Universitätsmedizin Neumarkt am Mieresch Campus Hamburg
                        </div>
                    </Col>
                    <Col xs={12} className="py-4">
                        <ul className="list-group list-unstyled">
                            <li>
                                <a href="#" className={`${styles.mobileFooterSubFontSize} text-light link-light`}>UMCH Shop</a>
                            </li>
                            <li>
                                <a href="#" className={`${styles.mobileFooterSubFontSize} text-light link-light`}>UMCH Medical Foundation Track</a>
                            </li>
                            <li>
                                <a href="#" className={`${styles.mobileFooterSubFontSize} text-light link-light`}><FontAwesomeIcon icon={faEnvelope} width={18} className="me-1" />Contact us</a>
                            </li>
                        </ul>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default MobileFooter;
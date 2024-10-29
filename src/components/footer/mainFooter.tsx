'use client';

import React, { useState, useEffect } from "react";
import styles from "./mainFooter.module.css";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faTiktok, faYoutube, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { StaticData, SanityImageHotspot, SanityImageCrop } from "@/sanity/types";
import { getStaticDataByTitle } from "@/utils/fetchData";
import { urlFor } from "@/sanity/lib/image";
import eventBus from "@/utils/eventBus";

interface staticDataPropTypes {
    logo?: {
        asset?: {
            _ref: string;
            _type: "reference";
            _weak?: boolean;
        };
        hotspot?: SanityImageHotspot;
        crop?: SanityImageCrop;
        _type: "image";
    };
}

const Footer: React.FC = () => {
    const [statistics, setStatistics] = useState<staticDataPropTypes>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchStaticData = async (lang: string) => {
        try {
            const staData: StaticData = await getStaticDataByTitle("logo", lang, `logo-${lang}`);
            if (staData.logo) {
                setStatistics(staData.logo as staticDataPropTypes);
            }
        } catch (err) {
            setError('Failed to fetch event data.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStaticData('de');
    }, []);

    useEffect(() => {
        const handleLangEvent = (lang: string) => {
            setLoading(true);
            fetchStaticData(lang);
        }

        eventBus.on('change-language', handleLangEvent);

        return () => {
            eventBus.off('change-language', handleLangEvent);
        }
    }, []);

    return (
        <div>
            <div className={`${styles.bgDark}`}>
                <Container className="text-white py-5 py-lg-5 py-md-3">
                    <Row className="justify-content-between mx-0 mt-4 pe-2 ps-0">
                        <Col md={4} className="h-100 ps-0">
                            <div className={`${styles.imgContainer} d-flex flex-column`}>
                                <img src="/logos/umch_blanco-opt.webp" className="mb-4" />
                                <p className={`${styles.footerFontSize} text-white`}>
                                    Universitätsmedizin Neumarkt
                                    am Mieresch Campus Hamburg
                                </p>
                            </div>
                        </Col>
                        <Col md={4} className="h-100">
                            <ul className="list-unstyled ps-3">
                                <li className={`${styles.footerFontSize} text-white`}>Albert-Einstein-Ring 11-15</li>
                                <li className={`${styles.footerFontSize} text-white`}>22761 Hamburg, Deutschland</li>
                                <li className={`${styles.footerFontSize} text-white`}>Tel.: +49 (0) 40-2093485-00</li>
                                <li className={`${styles.footerFontSize} text-white`}>Fax.: +49 (0) 40-2093485-09</li>
                                <li className={`${styles.footerFontSize} text-white`}>E-Mail: info@edu.umch.de</li>
                            </ul>
                        </Col>
                        <Col md={2} className="h-100">
                            <img src="/logos/UMCH_rund.svg" className="rounded d-block mb-2" width={"40%"} height={"40%"} alt="" />
                            <p className="fw-medium">
                                <a href="#" className={`${styles.footerFontSize} text-white link-light d-block mb-1 ps-1`}>Impressum</a>
                                <a href="#" className={`${styles.footerFontSize} text-white link-light d-block ps-1`}>Datenschutz</a>
                            </p>
                        </Col>
                        <Col md={2} className={`${styles.footerMedal} h-100`}>
                            <img src="/logos/Medaille.webp" className="d-block mb-2" width={"30%"} height={"30%"} alt="" />
                            <ul className={`list-unstyled`}>
                                <li className={`${styles.footerFontSize} text-white over-flow-word-break`}>Albert-Einstein-Ring 11-15</li>
                                <li className={`${styles.footerFontSize} text-white over-flow-word-break`}>22761 Hamburg, Deutschland</li>
                                <li className={`${styles.footerFontSize} text-white over-flow-word-break`}>Tel.: +49 (0) 40-2093485-00</li>
                                <li className={`${styles.footerFontSize} text-white over-flow-word-break`}>Fax.: +49 (0) 40-2093485-09</li>
                                <li className={`${styles.footerFontSize} text-white over-flow-word-break`}>E-Mail: info@edu.umch.de</li>
                            </ul>
                        </Col>
                    </Row>
                    <Row className={`${styles.branchLine} mx-0 ps-0`}>
                        <span className={`${styles.footerFontSize} ps-0`}>Eine Niederlassung der</span>
                        <hr className="opacity-100 mx-2" />
                    </Row>
                    <Row className="justify-content-between align-items-end mx-0 my-4 px-2 text-white ps-0">
                        <Col md={4} className="ps-0">
                            <div className={`${styles.imgContainer} d-flex flex-column`}>
                                <img src="/logos/umfst-logo-neu_whiteENG-01-1-768x231.webp" height={"auto"} />
                                <p className={`${styles.footerFontSize} mb-0 text-white mt-2`}>
                                    Universität für Medizin, Pharmazie,
                                    Naturwissenschaften und Technik
                                    Neumarkt am Mieresch
                                </p>
                            </div>
                        </Col>
                        <Col md={4}>
                            <ul className="list-unstyled mb-0 ps-3">
                                <li className={`${styles.footerFontSize} text-break`}>Gheorghe Marinescu, 38</li>
                                <li className={`${styles.footerFontSize} text-break`}>540139 Neumarkt am Mieresch, Rumänien</li>
                                <li className={`${styles.footerFontSize} text-break`}>Tel.: +40 (0) 265-215-551</li>
                                <li className={`${styles.footerFontSize} text-break`}>Fax.: +40 (0) 265-210-407</li>
                                <li className={`${styles.footerFontSize} text-break`}>E-Mail: administrativ@umftgm.ro</li>
                            </ul>
                        </Col>
                        <Col md={2}>
                            <ul className="list-group list-unstyled list-group-horizontal text-center">
                                <li>
                                    <a href="#" className="list-group-item bg-transparent border-0 text-white ps-0 pb-0">
                                        <FontAwesomeIcon icon={faInstagram} className={styles.iconSize} />
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="list-group-item bg-transparent border-0 text-white ps-0 pb-0">
                                        <FontAwesomeIcon icon={faTiktok} className={styles.iconSize} />
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="list-group-item bg-transparent border-0 text-white ps-0 pb-0">
                                        <FontAwesomeIcon icon={faFacebook} className={styles.iconSize} />
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="list-group-item bg-transparent border-0 text-white ps-0 pb-0">
                                        <FontAwesomeIcon icon={faYoutube} className={styles.iconSize} />
                                    </a>
                                </li>
                            </ul>
                        </Col>
                        <Col md={2} className="d-flex justify-content-end px-0">
                            <img src="/bilder/Samy_Hoddie_outline_EU_Flag.webp" className="pt-5 mt-4" height={145} />
                        </Col>
                    </Row>
                    <div className="pe-2 ps-0">
                        <hr className={`opacity-100 border-light`} />
                        <p className="text-end">
                            <a href="#" className={`${styles.footerFontSize} px-2 text-light link-underline link-underline-opacity-0`}>DE</a>
                            <a href="#" className={`${styles.footerFontSize} px-2 text-light link-underline link-underline-opacity-0 pe-0`}>ENG</a>
                        </p>
                    </div>
                    <Row className="justify-content-between fw-medium mx-0 px-0">
                        <p className="d-inline text-white text-start w-50 ps-0">
                            <small className={styles.footerSubFontSize}>@2024 – UMCH – Universitätsmedizin Neumarkt am Mieresch Campus Hamburg</small>
                        </p>
                        <p className="d-inline text-end w-50 pe-0">
                            <a href="#" className="px-2 text-light link-light text-nowrap">
                                <small className={`${styles.footerSubFontSize} d-inline`}>UMCH Shop</small>
                            </a>
                            <a href="#" className="px-2 text-light link-light text-nowrap">
                                <small className={`${styles.footerSubFontSize} d-inline`}>UMCH Medical Foundation Track</small>
                            </a>
                            <a href="#" className="px-2 text-light link-light text-nowrap">
                                <small className={`${styles.footerSubFontSize} d-inline`}><FontAwesomeIcon icon={faEnvelope} className="me-1" />Contact us</small>
                            </a>
                        </p>
                    </Row>
                </Container>
            </div>
        </div>
    );
};

export default Footer;

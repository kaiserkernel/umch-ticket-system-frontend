import React from "react";
import styles from "./footer.module.css";
import MainFooter from "./mainFooter";
import MobileFooter from "./mobileFooter";
import { Container, Row, Col } from "react-bootstrap";
import { PhoneCallIcon } from "lucide-react"

const Footer: React.FC<{ bgColor?: string }> = ({ bgColor }) => {
    return (
        <footer>
            <div className={`${bgColor === 'dark' && "bg-gray"} p-0 m-0 w-100 bg-to-white mobile-section-shadow`}>
                <Container className={`${styles.topFooterWrapContainer} py-4 py-md-5`}>
                    <Row className={`${styles.topFooterContainer} mx-0 py-2`}>
                        <Col md={7} className="ps-0">
                            <div className={`${styles.firstFooterText} fw-bold pt-2`}>
                                Vereinbaren Sie kostenlos und unverbindlich einen
                                Online-Beratungstermin inklusive virtueller Campustour.
                            </div>
                        </Col>
                        <Col md={5} className={`${styles.topFooterBtn} px-0 mt-2 mt-md-0`}>
                            <a href="#" className={`${styles.cameraBtn} btn btn-lg px-5 py-1 py-md-3 rounded-pill fw-medium d-md-flex align-items-center justify-content-center`}>
                                <img src="/icon/Icon_Camera.svg" className={`${styles.iconBlack} pe-3 ${styles.cameraSize}`} width={48} height={48} alt="camera.svg" />
                                <span className={styles.cameraFontSize}>Online Beratungstermin</span>
                            </a>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className={styles.mainFooter}>
                <MainFooter />
            </div>
            <div className={styles.mobileFooter}>
                <MobileFooter />
            </div>
            <div className={styles.fixedFooter}>
                <div className={`${styles.iconContainer} p-2`}>
                    <a href={""} className={`${styles.borderYellow} ${styles.fixedFooterIcon} border border-2 rounded-circle mx-2`}>
                        <PhoneCallIcon style={{ color: "ffe943" }} width={20} height={20} />
                    </a>
                    <a href={""} className={`${styles.borderYellow} ${styles.fixedFooterIcon} border border-2 rounded-circle mx-2`}>
                        <img src="/icon/Icon_Camera.svg" width={20} height={20} alt="Camera" />
                    </a>
                    <a href={""} className={`${styles.borderYellow} ${styles.fixedFooterIcon} border border-2 rounded-circle mx-2`}>
                        <img src="/icon/Icon_Letter.svg" width={20} height={20} alt="Letter" />
                    </a>
                    <a href={""} className={`${styles.borderYellow} ${styles.fixedFooterIcon} border border-2 rounded-circle mx-2`}>
                        <img src="/icon/Icon_Uni.svg" width={20} height={20} alt="Uni" />
                    </a>
                </div>
                <div className={`${styles.applyButton}`}>Jetzt bewerben</div>
            </div>
        </footer>
    );
};

export default Footer;

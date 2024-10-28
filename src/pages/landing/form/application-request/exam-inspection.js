import React, { useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import dayjs from "dayjs";

const StyledDatePicker = styled(DatePicker)`
  border: 1px solid !important;
  padding: 8px !important;
  border-radius: 0px !important;
  outline: none !important;
  width: 100% !important;

  &:focus {
    border-color: #2596be !important;
  }
`;

const ExamInspection = () => {
  const [selectedFromDate, handleSelectFromDate] = useState();
  return (
    <div className="mt-4 mt-md-4 g-4 g-md-4">
      <Row>
        <Col lg={12}>
          <Form.Group>
            <Form.Label className="input-label">
              Subject
              <span className="ms-1 required-label">*</span>
            </Form.Label>
            <Form.Control
              as="select"
              style={{
                appearance: "none", // Hides the default arrow
                MozAppearance: "none", // For Firefox
                WebkitAppearance: "none", // For Safari/Chrome
                backgroundColor: "white",
                color: "gray !important",
                // padding: "8px 12px",
                // border: "1px solid #007bff",
              }}
              className="custom-input"
            >
              <option value="">UMFST-UMCH Subjects</option>
              <option></option>
              <optgroup label="1st year of study">
                <option disabled=""></option>
                <option value="Anatomy 1">Anatomy 1</option>
                <option value="Anatomy 2">Anatomy 2</option>
                <option value="BioChemistry 1">BioChemistry 1</option>
                <option value="Biochemistry 2">BioChemistry 2</option>
                <option value="Biophysics">Biophysics</option>
                <option value="Medical Informatics">Medical Informatics</option>
                <option value="Medical Biostatistics">
                  Medical Biostatistics
                </option>
                <option value="Molecular and Cell Biology">
                  Molecular and Cell Biology
                </option>
                <option value="Medical Terminology">Medical Terminology</option>
                <option value="Physiology 1">Physiology 1</option>
                <option value="Romanian Cultural Studies 1.1">
                  Romanian Cultural Studies 1.1
                </option>
                <option value="Romanian Cultural Studies 1.2">
                  Romanian Cultural Studies 1.2
                </option>
              </optgroup>
              <option disabled=""></option>
              <optgroup label="2nd year of study">
                <option disabled=""></option>
                <option value="Physiology 2">Physiology 2</option>
                <option value="Physiology 3">Physiology 3</option>
                <option value="Histology 1">Histology 1</option>
                <option value="Histology 2">Histology 2</option>
                <option value="Anatomy 3">Anatomy 3</option>
                <option value="Patient Doctor Communication">
                  Patient Doctor Communication
                </option>
                <option value="Medical Deontology Bioethics">
                  Medical Deontology Bioethics
                </option>
                <option value="Genetics">Genetics</option>
                <option value="Introduction in Practical Work">
                  Introduction in Practical Work
                </option>
                <option value="First Aid">First Aid</option>
                <option value="Romanian Cultural Strudies 2.1">
                  Romanian Cultural Strudies 2.1
                </option>
                <option value="Romanian Cultural Strudies 2.2">
                  Romanian Cultural Strudies 2.2
                </option>
              </optgroup>
              <option disabled=""></option>
              <optgroup label="3rd year of study">
                <option disabled=""></option>
                <option value="Pathology 1">Pathology 1</option>
                <option value="Pathology 2">Pathology 2</option>
                <option value="Pharmacology 1">Pharmacology 1</option>
                <option value="Pharmacology 2">Pharmacology 2</option>
                <option value="Scientific Research Methodology">
                  Scientific Research Methodology
                </option>
                <option value="Pathophysiology 1">Pathophysiology 1</option>
                <option value="Pathophysiology 2">Pathophysiology 2</option>
                <option value="Medical Semiology 1">Medical Semiology 1</option>
                <option value="Medical Semiology 2">Medical Semiology 2</option>
                <option value="Surgical Semiology 1">
                  Surgical Semiology 1
                </option>
                <option value="Surgical Semiology 2">
                  Surgical Semiology 2
                </option>
                <option value="Bacteriology. Virusology. Parasitology 1">
                  Bacteriology. Virusology. Parasitology 1
                </option>
                <option value="Bacteriology. Virusology. Parasitology 2">
                  Bacteriology. Virusology. Parasitology 2
                </option>
                <option value="Hygiene, Environmental Health and Food Safety">
                  Hygiene, Environmental Health and Food Safety
                </option>
                <option value="Clinical Biochemistry. Immunology">
                  Clinical Biochemistry. Immunology
                </option>
              </optgroup>
              <option disabled=""></option>
              <optgroup label="4th year of study">
                <option disabled=""></option>
                <option value="Orthopedics and Traumatology">
                  Orthopedics and Traumatology
                </option>
                <option value="General Surgery">General Surgery</option>
                <option value="Urology">Urology</option>
                <option value="Endocrinology">Endocrinology</option>
                <option value="Pediatric Surgery. Pediatric Orthopedics">
                  Pediatric Surgery. Pediatric Orthopedics
                </option>
                <option value="Plastic, Esthetics and Reconstructive Microsurgery">
                  Plastic, Esthetics and Reconstructive Microsurgery
                </option>
                <option value="Cardiology-Internal medicine">
                  Cardiology-Internal medicine
                </option>
                <option value="Hematology-Internal medicine">
                  Hematology-Internal medicine
                </option>
                <option value="Emergency medicine">Emergency medicine</option>
                <option value="Child Care">Child Care</option>
                <option value="Radiology and medical imaging">
                  Radiology and medical imaging
                </option>
                <option value="Occupational medicine and professional diseases">
                  Occupational medicine and professional diseases
                </option>
                <option value="Oral-maxillo-facial Surgery">
                  Oral-maxillo-facial Surgery
                </option>
              </optgroup>
              <option disabled=""></option>
              <optgroup label="5th year of study">
                <option disabled=""></option>
                <option value="Gastroenterology-Internal medicine">
                  Gastroenterology-Internal medicine
                </option>
                <option value="Nephrology-Internal medicine">
                  Nephrology-Internal medicine
                </option>
                <option value="Diabetology and Nutritional Diseases-Internal medicine">
                  Diabetology and Nutritional Diseases-Internal medicine
                </option>
                <option value="ENT (Ear Nose Throat)">
                  ENT (Ear Nose Throat)
                </option>
                <option value="Ophthalmology">Ophthalmology</option>
                <option value="Anesthesia-Intensive Care">
                  Anesthesia-Intensive Care
                </option>
                <option value="Rheumatology">Rheumatology</option>
                <option value="Rehabilitation, Physical Medicine and Balneology">
                  Rehabilitation, Physical Medicine and Balneology
                </option>
                <option value="Dermatology">Dermatology</option>
                <option value="Neurology">Neurology</option>
                <option value="Pediatrics">Pediatrics</option>
                <option value="Pneumology">Pneumology</option>
                <option value="Medical Oncology">Medical Oncology</option>
                <option value="Pediatric Psychiatry">
                  Pediatric Psychiatry
                </option>
              </optgroup>
              <option disabled=""></option>
              <optgroup label="6th year of study">
                <option disabled=""></option>
                <option value="Obstetrics-Gynecology. Neonatology">
                  Obstetrics-Gynecology. Neonatology
                </option>
                <option value="Infectious Diseases">Infectious Diseases</option>
                <option value="Family medicine">Family medicine</option>
                <option value="Public Health">Public Health</option>
                <option value="Health Management">Health Management</option>
                <option value="Primary Care">Primary Care</option>
                <option value="Palliative Care">Palliative Care</option>
                <option value="Epidemiology">Epidemiology</option>
                <option value="Psychiatry">Psychiatry</option>
                <option value="Forensic Medicine">Forensic Medicine</option>
              </optgroup>
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
      <Row className="mt-2 g-4 g-md-4">
        <Col lg={6}>
          <Form.Group controlId="">
            <Form.Label className="input-label">
              Nationality
              <span className="ms-1 required-label">*</span>
            </Form.Label>
            <StyledDatePicker
              selected={selectedFromDate}
              onChange={(date) => handleSelectFromDate(date)}
              dateFormat="yyyy/MM/dd"
              isClearable
              className="custom-input"
            />
          </Form.Group>
        </Col>
        <Col lg={6}>
          <Form.Group>
            <Form.Label className="input-label">
              Current year of study
              <span className="ms-1 required-label">*</span>
            </Form.Label>
            <Form.Control
              as="select"
              style={{
                appearance: "none", // Hides the default arrow
                MozAppearance: "none", // For Firefox
                WebkitAppearance: "none", // For Safari/Chrome
                backgroundColor: "white",
                color: "gray !important",
                // padding: "8px 12px",
                // border: "1px solid #007bff",
              }}
              className="custom-input"
            >
              <option value="">– Select –</option>
              <option value="PA exam">PA exam</option>
              <option value="PA re-exam">PA re-exam</option>
              <option value="PA re-re-exam">PA re-re-exam</option>
              <option value="Written exam">Written exam</option>
              <option value="Written Re-exam">Written Re-exam</option>
              <option value="Written Re-re-exam">Written Re-re-exam</option>
              <option value="OSCE">OSCE</option>
              <option value="Re-OSCE">Re-OSCE</option>
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col lg={12}>
          <Form.Group controlId="commentTextarea">
            <Form.Label className="input-label">Comments</Form.Label>
            <Form.Control
              as="textarea"
              rows={6}
              placeholder=""
              className="custom-textarea-input"
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col lg={12}>
          <Form.Group controlId="">
            <Form.Label className="input-label mb-0">Upload File</Form.Label>
            <div className="text-center">
              <div className="mt-3 btn btn-primary px-4 py-2 upload-btn">
                <div className="d-flex flex-column"></div>
              </div>
            </div>
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
};

export default ExamInspection;

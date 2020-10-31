import React, { useContext, useEffect, useState } from "react";
import { DataRecipientBrand, DataHolderBrand } from "../../_models/Brands";
import styles from "./viewDataHolder.module.scss";
import Button, { ButtonType } from "../../_components/Button";
import Breadcrumbs from "../../_components/BreadCrumbs";
import Card from "../../_components/Card";
import Alert, { AlertType } from "../../_components/Alert";
import { useParams } from "react-router-dom";
import { setConstantValue } from "typescript";
import service from "../../_services/serviceCall";
import { UserData } from "react-oidc";
import { AsyncStatus } from "../../_models/Status";
import DownloadFile from "../../_components/DownloadFile";
import { htmlReport } from "../ReportGenerator/test-report";
export interface IViewDetailsProps {
  dataRecipientsBrands?: DataRecipientBrand[];
  dataHolderBrands?: DataHolderBrand[];
  error?: any;
}

function ViewDataHolder(props: IViewDetailsProps) {
  let { dataHolderID }: any = useParams();
  let [dataHolder, setDataHolder]: any = useState(null);
  let [testplan, setTestplan]: any = useState(null);
  let [testplanStatus, setTestplanStatus]: any = useState(
    AsyncStatus.NotStarted
  );

  const context = useContext(UserData);

  // Get the latest testplan/raw report
  const getTestPlan = (conformanceId) => {
    setTestplanStatus(AsyncStatus.Loading);
    service(context.user?.access_token)
      .getDataHolderRawReport(conformanceId)
      .then(({ data }) => {
        setTestplan(data);
        setTestplanStatus(AsyncStatus.Success);
      })
      .catch((err) => {
        setTestplanStatus(AsyncStatus.Error);
      });
  };

  useEffect(() => {
    // matching dataHolder to URL param
    let dataHolder =
      props.dataHolderBrands &&
      props.dataHolderBrands.find(
        (dataHolder) => dataHolderID === dataHolder.brandGuid
      );
    setDataHolder(dataHolder);

    if (dataHolder?.conformanceId) {
      getTestPlan(dataHolder.conformanceId);
    }
  }, [props.dataHolderBrands, dataHolderID]);

  return (
    <div className={styles.contentWrapper}>
      {dataHolder ? (
        <div>
          <Breadcrumbs text={dataHolder.legalEntityName} />
          <h2>{dataHolder.legalEntityName}</h2>
          <p>Manage a participant's details and test plans.</p>
          {/* <Alert title="Success" alertType={AlertType.Success}>
        Enrolment saved 21/10/2020, 14:38:52 AEST
      </Alert> */}
          <div className={styles.cards__wrapper}>
            <div className={styles.cards__left}>
              <Card heading="Participant details">
                <p className={styles.success}>Created 16 Oct 2020</p>
                <table className={styles.card__table}>
                  <caption className={styles.visuallyHidden}>
                    Participant details
                  </caption>
                  {dataHolder && (
                    <tbody>
                      <tr>
                        <th>Contact Email</th>
                        <td>{dataHolder.contactEmail}</td>
                      </tr>
                      <tr>
                        <th>Legal entity name</th>
                        <td>{dataHolder.legalEntityName}</td>
                      </tr>
                      <tr>
                        <th>Brand Name</th>
                        <td>{dataHolder.brandName}</td>
                      </tr>
                      <tr>
                        <th className={styles.card__tableHead}>Brand GUID</th>
                        <td className={styles.card__tableData}>
                          {dataHolder.brandGuid}
                        </td>
                      </tr>
                      <tr>
                        <th className={styles.card__tableHead}>
                          Conformance ID
                        </th>
                        <td className={styles.card__tableData}>
                          {dataHolder.conformanceId}
                        </td>
                      </tr>
                      <tr>
                        <th>JWKSUri</th>
                        <td>{dataHolder.jwksUri}</td>
                      </tr>
                      <tr>
                        <th>PubliceBaseUri</th>
                        <td>{dataHolder.publicBaseUri}</td>
                      </tr>
                      <tr>
                        <th>ResourceUri</th>
                        <td>{dataHolder.resourcesUri}</td>
                      </tr>
                      <tr>
                        <th>InfosecUri</th>
                        <td>{dataHolder.infosecUri}</td>
                      </tr>
                      <tr>
                        <th>WebsiteUri</th>
                        <td>{dataHolder.websiteUri}</td>
                      </tr>
                      <tr>
                        <th>ParticipantBaseUri</th>
                        <td>{dataHolder.participantBaseUri}</td>
                      </tr>
                    </tbody>
                  )}
                </table>
                <div className={styles.card__buttons}>
                  <Button
                    text="Edit details"
                    size={ButtonType.Small}
                    secondary
                  ></Button>
                </div>
              </Card>
            </div>
            <div className={styles.cards__right}>
              <Card heading="Test Plan">
                <p>Create, restart or finalise a plan.</p>
                <p className={styles.warning}>In progress</p>
                <div className={styles.card__buttons}>
                  <Button
                    text="Restart test plan"
                    size={ButtonType.Small}
                    secondary
                  ></Button>
                  <Button
                    text="Finalise test plan"
                    size={ButtonType.Small}
                    secondary
                  ></Button>
                </div>
              </Card>
              {testplan && (
                <Card heading="Raw report">
                  <p>
                    Generate an HTML report of the current test plan status. A
                    report can be generated before or after the test plan is
                    finalised.
                  </p>
                  <p className={styles.warning}>Partially complete</p>
                  <table className={styles.card__table}>
                    <caption className={styles.visuallyHidden}>
                      Test plan summary
                    </caption>
                    <tbody>
                      <tr>
                        <td>
                          <b>2/4</b> scenarios successful
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <b>1/4</b> scenarios failed
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <b>1/4</b> scenarios not started
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className={styles.card__buttons}>
                    <DownloadFile
                      text="Generate report"
                      data={htmlReport({
                        brandGuid: dataHolder.brandGuid,
                        participant: dataHolder.brandName,
                        reportGenerated: new Date().toLocaleString(),
                        testplan,
                      })}
                      filename={`${dataHolder?.brandName}-${
                        dataHolder?.conformanceId
                      } - ${new Date().toLocaleString()}.html`}
                    ></DownloadFile>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div>loading...</div>
      )}
    </div>
  );
}

export default ViewDataHolder;

import React, { useState } from "react";
import { DataRecipientBrand, DataHolderBrand } from "../../_models/Brands";
import styles from "./landingPage.module.scss";
import Button, { ButtonType } from "../../_components/Button";
import { Link } from "react-router-dom";
import { AsyncStatus } from "../../_models/Status";
import LoadingSpinner from "../../_components/LoadingSpinner";

export interface ILandingPageProps {
  dataRecipientsBrands: DataRecipientBrand[];
  getDataRecipientsStatus: AsyncStatus;
  dataHolderBrands: DataHolderBrand[];
  getDataHoldersStatus: AsyncStatus;
  error: any;
}

enum ActiveTab {
  dataHolders = "dataHolders",
  dataRecipients = "dataRecipients",
}

function LandingPage(props: ILandingPageProps) {
  const [activeTab, setActiveTab] = useState(ActiveTab.dataHolders);

  return (
    <div className={styles.landingPage}>
      {props.getDataHoldersStatus && props.dataRecipientsBrands ? (
        <div>
          <div className={styles.landingPage__highlight}>
            <div className={styles.contentWrapper}>
              <h1>CTS Administration</h1>
              <p>
                This page allows ACCC staff to manage participation in the
                Conformance Test Suite (CTS). To view <br />a list of
                participants, choose between data holders or data recipients.
              </p>
            </div>
          </div>

          {/* New Participants */}
          <section
            className={`${styles.tableSection} ${styles.contentWrapper}`}
          >
            <div className={styles.buttonsGroups}>
              <Button
                text="New data holder"
                size={ButtonType.Small}
                secondary
              ></Button>
              <Button
                text="New data recipient"
                size={ButtonType.Small}
                secondary
              ></Button>
            </div>
            {/* Tabs */}
            <div>
              <div className={styles.tabsAndButtons}>
                <div className={styles.containerTabs}>
                  <ul className={styles.navTabs}>
                    <li
                      className={
                        activeTab === ActiveTab.dataHolders
                          ? styles.activetab
                          : ""
                      }
                    >
                      <a onClick={() => setActiveTab(ActiveTab.dataHolders)}>
                        Data holders
                      </a>
                    </li>
                    <li
                      className={
                        activeTab === ActiveTab.dataRecipients
                          ? styles.activetab
                          : ""
                      }
                    >
                      <a onClick={() => setActiveTab(ActiveTab.dataRecipients)}>
                        Data recipients
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* List of Participants Table*/}
            <div>
              {/* Data Holders */}
              {activeTab === ActiveTab.dataHolders &&
                (props.getDataHoldersStatus === AsyncStatus.Success ? (
                  <table>
                    <thead>
                      <tr>
                        <th>Legal entity</th>
                        <th>Brand name</th>
                        <th>Brand GUID</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Each Participant */}
                      {props.dataHolderBrands?.map((brand) => (
                        <tr key={brand.brandGuid}>
                          <td>{brand.legalEntityName}</td>
                          <td>{brand.brandName}</td>
                          <td>{brand.brandGuid}</td>
                          <td>
                            <Link
                              // className={styles.noBorder}
                              to={`/data-holder/${brand.brandGuid}`}
                            >
                              Manage
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : props.getDataHoldersStatus === AsyncStatus.Error ? (
                  `Error: ${props.error}`
                ) : (
                  "Loading..."
                ))}

              {/* Data Recipients */}
              {activeTab === ActiveTab.dataRecipients &&
                (props.getDataRecipientsStatus === AsyncStatus.Success ? (
                  <table>
                    <thead>
                      <tr>
                        <th>Brand name</th>
                        <th>Software product name</th>
                        <th>Software ref ID</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Each Participant */}
                      {props.dataRecipientsBrands?.map((brand) => (
                        <tr key={brand.brandGuid}>
                          <td>{brand.brandName}</td>
                          <td>
                            {brand.softwareProducts[0]?.softwareProductName}
                          </td>
                          <td>
                            {brand.softwareProducts[0]?.softwareProductRef}
                          </td>
                          <td>
                            <Link
                              // className={styles.noBorder}
                              to={`/data-recipient/${brand.softwareProducts[0]?.softwareProductGuid}`}
                            >
                              Manage
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : props.getDataRecipientsStatus === AsyncStatus.Error ? (
                  `Error: ${props.error}`
                ) : (
                  "Loading..."
                ))}
            </div>
          </section>
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
}

export default LandingPage;

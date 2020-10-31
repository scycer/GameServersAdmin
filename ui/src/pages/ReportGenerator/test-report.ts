export const htmlReport = (data: {
  participant: string;
  brandGuid: string;
  reportGenerated: string;
  testplan: any;
}) => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, shrink-to-fit=no"
    />
    <meta
      name="description"
      content="This prototype is for testing ideas for the Conformance Test Suite (CTS)"
    />
    <link rel="icon" href="assets/img/favicon.ico" />
    <title>CTS Proto | DH Report</title>
    <style>
      @import url("https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400;700&display=swap");

      html {
        font-size: 10px;
      }

      body {
        font-family: "Lato", sans-serif;
        margin: 0 0 10px 0;
      }

      h1 {
        font-weight: 400;
        font-size: 3rem;
        line-height: 1.3;
        margin: 0;
        color: white;
      }

      table {
        width: 100%;
        min-width: 500px;
        border-collapse: collapse;
        font-size: 16px;
        margin: 1em 0 4em 0;
      }

      caption {
        font-size: 2rem;
        font-weight: 700;
        margin-bottom: 30px;
        border: none;
        text-align: left;
      }

      th {
        background-color: #eeeef1;
        font-weight: 400;
        text-align: left;
        padding: 19px 16px;
      }

      tr {
        min-height: 60px;
        border-bottom: 1px solid #eeeef1;
      }
      .summary-row {
        border-top: 2px solid #eeeef1;
        border-bottom: 2px solid #eeeef1;
      }

      td {
        font-weight: 300;
        padding: 19px 16px;
        vertical-align: top;
      }

      .contentWrapper {
        max-width: 1240px;
        width: 100%;
        padding: 0 4vw;
        margin: 0 auto 1em auto;
      }
      .contentWrapper section {
        position: relative;
      }

      .header {
        background: #0d45d6;
        margin: 0 0 40px 0;
        padding: 2em 0 3em 0;
      }
      .header h2 {
        font-weight: 700;
        font-size: 1.6rem;
        margin: 0.5em 0 0 0;
        color: white;
      }

      .header p {
        font-size: 1.4rem;
        font-weight: 300;
        margin: 0;
        color: white;
      }

      .header__container {
        max-width: 1240px;
        margin: 0 auto;
        width: 100%;
        position: relative;
      }

      .notes-error {
        color: #eb1c3b;
      }
      .validation-alert {
        width: 100%;
        border: 1px solid #eeeef1;
        margin: 0 0 4em 0;
      }
      .validation-alert__header {
        border-top: 9px solid #0d45d6;
        width: 100%;
      }
      .validation-alert__content {
        width: 100%;
        padding: 1em 1em 2em 3em;
      }
      .validation-alert__content h2 {
        font-weight: 700;
        font-size: 2.4rem;
        margin-bottom: 0.25em;
      }
      .validation-alert__content {
        font-size: 1.5rem;
        font-weight: 300;
      }
      .validation-alert__generated {
        font-weight: 400;
        color: #0d45d6;
      }
    </style>
  </head>
  <body hidden>
    <div class="header">
      <div class="contentWrapper">
        <h1>Conformance Test Suite - Report</h1>
        <h2 id="participant">XXXXXX</h2>
        <p>
          Brand GUID:
          <span id="brandGuid">XXXXXX</span>
        </p>
      </div>
    </div>
    <main>
      <div class="contentWrapper" id="contentWrapper">
        <div class="validation-alert">
          <div class="validation-alert__header"></div>
          <div class="validation-alert__content">
            <h2>
              Test plan <span id="testPlanOverallStatus">partially complete</span>
            </h2>
            <p id="statusSummaries">
              &nbsp; <strong>X/X</strong> scenarios failed &nbsp;
              <strong>X/X</strong> scenarios successful &nbsp;
              <strong>X/X</strong> scenarios not started
            </p>
            <p class="validation-alert__generated">
              Report generated:
              <span id="reportGenerated">XXX</span>
            </p>
          </div>
        </div>

        <span id="scenarios"></span>
      </div>
    </main>

    <script>
      var data = JSON.parse('${JSON.stringify(data)}')

      // **********************************
      // Make sure the following data exist
      // **********************************
      var requiredData = {
        participant: data.participant,
        brandGuid: data.brandGuid,
        reportGenerated: data.reportGenerated,
        testplan: data.testplan,
      }

      Object.keys(requiredData).forEach((data) => {
        if (requiredData[data]) {
          console.log(data + ": ", requiredData[data])
        } else {
          console.error(data + " is missing!")
        }
      })

      // ***************
      // Code to dynamically load data into HTML page
      // ***************

      // Utility Functions
      const setElInnerHTML = (el, html) =>
        (document.getElementById(el).innerHTML = html)

      // ***************
      // Header
      // ***************
      setElInnerHTML("participant", data.participant)
      setElInnerHTML("brandGuid", data.brandGuid)

      // ***************
      // Summary Panel
      // ***************

      // - ScenarioStep Status are: NotStarted, Success, Failure, Inconclusive, InProgress,
      const scenariosCountByStatus = (status) =>
        data.testplan.scenarios.filter(
          (scenario) => !status || scenario.status === status
        ).length

      const scenariosFailed =
        scenariosCountByStatus("Failure") + scenariosCountByStatus("Inconclusive")

      const scenariosNotStarted = scenariosCountByStatus("NotStarted")
      const scenariosSuccess = scenariosCountByStatus("Success")
      const scenariosInProgress = scenariosCountByStatus("InProgress")
      const scenariosCount = scenariosCountByStatus()

      // Define overall testplan status
      // - Testplan Status are: NotStarted, InProgress, Compelted, Interuppted
      const testplanStatus =
        data.testplan.status === "InProgress"
          ? "in progress"
          : scenariosSuccess !== scenariosCount
          ? "partially complete"
          : "complete"

      setElInnerHTML("testPlanOverallStatus", testplanStatus)

      // Status Summaries
      const statusSummariesleftMargin = "10px"
      document.getElementById("statusSummaries").innerHTML =
        (scenariosFailed > 0
          ? '<strong style="margin-left: ' +
            statusSummariesleftMargin +
            ">" +
            scenariosFailed +
            "/" +
            scenariosCount +
            "</strong> scenarios failed"
          : "") +
        (scenariosSuccess > 0
          ? '<strong style="margin-left: ' +
            statusSummariesleftMargin +
            ">" +
            scenariosSuccess +
            "/" +
            scenariosCount +
            "</strong> scenarios successful"
          : "") +
        (scenariosInProgress > 0
          ? '<strong style="margin-left: ' +
            statusSummariesleftMargin +
            ">" +
            scenariosInProgress +
            "/" +
            scenariosCount +
            "</strong> scenarios in progress"
          : "") +
        (scenariosNotStarted > 0
          ? '<strong style="margin-left: ' +
            statusSummariesleftMargin +
            ">" +
            scenariosNotStarted +
            "/" +
            scenariosCount +
            "</strong> scenarios not started"
          : "")

      // Remove marginleft from first appended el
      document.getElementById("statusSummaries").style.marginLeft =
        "-" + statusSummariesleftMargin

      setElInnerHTML("reportGenerated", data.reportGenerated)

      // ***************
      // Scenarios
      // ***************

      data.testplan.scenarios.forEach((scenario) => {
        const tableEl = document.createElement("table")

        // Caption
        const captionEl = document.createElement("caption")
        captionEl.innerText = scenario.name
        tableEl.appendChild(captionEl)

        // Table Header
        const theadEl = document.createElement("thead")
        theadEl.innerHTML =
          "<tr><th>Test steps</th><th>Notes</th><th>Status</th></tr>"
        tableEl.appendChild(theadEl)

        // Table Rows (each step)
        const tbodyEl = document.createElement("tbody")

        scenario.steps.forEach((step) => {
          const trEl = document.createElement("tr")

          const stepNameTdEl = document.createElement("td")
          stepNameTdEl.innerText = step.name
          trEl.appendChild(stepNameTdEl)

          const notesTdEl = document.createElement("td")
          notesTdEl.innerText = step.errorDetails ? step.errorDetails : "-"
          trEl.appendChild(notesTdEl)

          const statusTdEl = document.createElement("td")
          const formattedStatusText = {
            NotStarted: "Not started",
            Success: "Success",
            Failure: "Failure",
            Inconclusive: "Inconclusive",
            InProgress: "In progress",
          }[step.status]
          statusTdEl.innerText = formattedStatusText || step.status

          trEl.appendChild(statusTdEl)
          tbodyEl.appendChild(trEl)
        })

        // Summary row
        const summaryTrEl = document.createElement("tr")
        const formattedStatusText = {
          InProgress: "In progress",
          NotStarted: "Not started",
          Failure: "Failure",
          Interrupted: "Interrupted",
          Success: "Success",
        }[scenario.status]
        summaryTrEl.innerHTML =
          '<td colspan="3"><strong>Test scenario ' +
          (formattedStatusText || scenario.status) +
          "</strong></td>"

        tbodyEl.appendChild(summaryTrEl)
        tableEl.appendChild(tbodyEl)
        document.getElementById("scenarios").appendChild(tableEl)
      })

      // Show the body once all js is done
      document.body.hidden = false

      // See scenario count in console
      console.table([
        {
          Count: scenariosCount,
          NotStarted: scenariosNotStarted,
          InProgress: scenariosInProgress,
          Success: scenariosSuccess,
          Failed: scenariosFailed,
        },
      ])
    </script>
  </body>
</html>
`;

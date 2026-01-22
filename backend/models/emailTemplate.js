export const emailTemplate = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Welcome Email</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <link
      href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap"
      rel="stylesheet"
    />

    <style>
      body,
      table,
      td,
      p,
      a,
      h1,
      h2,
      h3 {
        font-family: "Poppins", Arial, Helvetica, sans-serif !important;
      }
      body {
        margin: 0;
        padding: 0;
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
      }
      /* Default desktop styles - hide mobile elements */
      .mobile-only {
        display: none !important;
        mso-hide: all;
      }
      .desktop-only {
        display: table-cell !important;
      }
      .mobile-footer {
        display: none !important;
      }

      @media only screen and (max-width: 640px) {
        body { min-width: 100vw !important; }
        .email-container { width: 100% !important; min-width: 100% !important; max-width: 100% !important; }
        .email-content { padding: 30px 20px 20px 20px !important; }
        .content-table { table-layout: auto !important; width: 100% !important; }

        /* Hide desktop elements, show mobile elements */
        .desktop-only {
          display: none !important;
          mso-hide: all;
        }
        .mobile-only {
          display: table-row !important;
        }
        .mobile-only td {
          display: table-cell !important;
        }

        /* Mobile Header - Combined Row */
        .mobile-header-row {
          display: table-row !important;
          width: 100% !important;
        }
        .mobile-header-row td {
          display: block !important;
          width: 100% !important;
          box-sizing: border-box !important;
        }
        .mobile-logo-container {
          display: block !important;
          width: 100% !important;
          text-align: right !important;
          margin-bottom: 15px !important;
          position: static !important;
        }
        .mobile-logo-container a {
          display: inline-block !important;
        }
        .mobile-logo-container img {
          width: 93px !important;
          height: 93px !important;
          display: inline-block !important;
          border: 0 !important;
        }
        .mobile-headline-container {
          display: block !important;
          position: static !important;
          width: 88% !important;
          max-width: 88% !important;
          padding-top: 0 !important;
          padding-right: 0 !important;
          padding-bottom: 30px !important;
        }
        .mobile-headline-container h1 {
          font-size: 45px !important;
          line-height: 55px !important;
          margin: 0 !important;
          text-align: left !important;
          color: #ffde00 !important;
          font-weight: 500 !important;
          width: 100% !important;
        }

        /* Mobile Greeting */
        .mobile-greeting {
          font-size: 28px !important;
          margin: 0 0 20px 0 !important;
          text-align: left !important;
        }

        /* Mobile Body Text */
        .mobile-body-text {
          font-size: 15px !important;
          line-height: 155% !important;
          margin: 0 0 15px 0 !important;
          text-align: left !important;
        }

        /* Mobile Profile Image Section */
        .mobile-profile-section {
          display: table-row !important;
        }
        .mobile-profile-section td {
          display: table-cell !important;
          padding: 25px 0 !important;
        }
        .mobile-profile-img {
          width: 100% !important;
          max-width: 100% !important;
          height: auto !important;
          display: block !important;
        }

        /* Mobile Quote Section */
        .mobile-quote-section {
          display: table-row !important;
        }
        .mobile-quote-section td {
          display: table-cell !important;
          padding: 0 !important;
        }
        .quote-container {
          background: linear-gradient(180deg, #2a2a2a 0%, #1a1a1a 100%) !important;
          padding: 25px 20px !important;
          position: relative !important;
        }
        .quote-marks {
          font-size: 48px !important;
          color: #ffcb05 !important;
          font-weight: 700 !important;
          line-height: 1 !important;
          margin-bottom: 10px !important;
        }
        .quote-text {
          font-size: 14px !important;
          line-height: 160% !important;
          color: #cdcdcd !important;
          margin: 0 0 20px 0 !important;
          font-style: italic !important;
        }
        .quote-name {
          font-size: 18px !important;
          font-weight: 600 !important;
          color: #ffffff !important;
          margin: 0 !important;
        }
        .quote-title {
          font-size: 14px !important;
          color: #969696 !important;
          margin: 5px 0 0 0 !important;
        }

        /* Mobile Info Box */
        .mobile-info-box {
          display: table-row !important;
        }
        .mobile-info-box td {
          display: table-cell !important;
          padding: 20px 0 !important;
        }
        .info-box {
          margin: 0 !important;
          width: 100% !important;
          background-color: #333333 !important;
          table-layout: fixed !important;
        }
        .info-box tr { display: table-row !important; }
        .info-box td {
          display: table-cell !important;
          font-size: 14px !important;
          line-height: 160% !important;
          padding: 18px 15px !important;
          color: #cdcdcd !important;
        }
        .info-box .yellow-bar {
          background-color: #ffcb05 !important;
          width: 4px !important;
          max-width: 4px !important;
          min-width: 4px !important;
          padding: 0 !important;
          font-size: 0 !important;
          line-height: 0 !important;
          overflow: hidden !important;
          display: table-cell !important;
        }
        .info-box p {
          font-size: 14px !important;
          line-height: 160% !important;
          margin: 0 !important;
        }
        .info-box a {
          color: #cdcdcd !important;
          text-decoration: underline !important;
          word-break: break-all !important;
        }

        /* Mobile Culture Text */
        .mobile-culture-text {
          font-size: 15px !important;
          line-height: 160% !important;
          margin: 0 0 15px 0 !important;
        }

        /* Mobile Tagline */
        .mobile-tagline {
          font-size: 20px !important;
          line-height: 26px !important;
          margin: 20px 0 !important;
          text-transform: uppercase !important;
        }

        /* Mobile Signature */
        .mobile-signature {
          font-size: 15px !important;
          margin: 0 0 0 0 !important;
        }

        /* Mobile Decorative Image */
        .mobile-decorative-row {
          display: table-row !important;
        }
        .mobile-decorative-row td {
          display: table-cell !important;
          text-align: right !important;
          padding: 0 !important;
        }
        .mobile-decorative-img {
          max-width: 165px !important;
          margin-left: auto !important;
          display: block !important;
        }

        /* --- MOBILE FOOTER --- */
        .desktop-footer {
          display: none !important;
        }
        .mobile-footer {
          display: block !important;
          width: 100% !important;
          overflow: hidden !important;
        }
        .mobile-footer table {
          width: 100% !important;
        }
        .mobile-footer-row {
          display: table-row !important;
          width: 100% !important;
        }
        .mobile-footer-cell {
          display: table-cell !important;
          width: 50% !important;
          text-align: left !important;
          vertical-align: middle !important;
        }
        .mobile-footer-cell a {
          font-size: 14px !important;
          display: inline-flex !important;
          align-items: center !important;
          vertical-align: middle !important;
          text-decoration: none !important;
        }
        .mobile-footer-cell img {
          vertical-align: middle !important;
          display: inline-block !important;
          padding-left:0px;
          padding-right:3px;
        }
        .mobile-footer-cell span {
          display: inline-block !important;
          vertical-align: middle !important;
        }
        .mobile-social-row {
          display: table-row !important;
          width: 100% !important;
        }
        .mobile-social-row td {
          display: table-cell !important;
          text-align: center !important;
          padding-top: 20px !important;
        }
        .mobile-social-row a {
          display: inline-block !important;
          margin: 0 10px !important;
        }

        /* Hide desktop header row */
        .header-row {
          display: none !important;
        }
        .header-row td {
          display: none !important;
        }

        /* Hide desktop content row */
        .content-row {
          display: none !important;
        }
        .content-row td {
          display: none !important;
        }
      }
    </style>
  </head>
  <body>
    <table
      width="100%"
      cellpadding="0"
      cellspacing="0"
      border="0"
      bgcolor="#000000"
      align="center"
    >
      <tr>
        <td align="center" valign="top" style="padding: 0;">
          <table
            class="email-container"
            width="1200"
            cellpadding="0"
            cellspacing="0"
            border="0"
            style="
              width: 100%;
              max-width: 1200px;
              background-color: #222222;
              color: #ffffff;
            "
          >
            <tr>
              <td class="email-content" style="padding: 70px 70px 0 70px">
                <table
                  class="content-table"
                  width="100%"
                  cellpadding="0"
                  cellspacing="0"
                  border="0"
                  style="table-layout: fixed"
                >
                  <!-- ============ MOBILE LAYOUT ============ -->

                  <!-- Mobile Header Row (Logo + Headline) -->
                  <tr class="mobile-only mobile-header-row" style="display: none;">
                    <td colspan="4" style="display: block; width: 100%;">
                      <!-- Logo positioned at top-right -->
                      <div class="mobile-logo-container" style="display: block; width: 100%; text-align: right; margin-bottom: 15px;">
                        <a href="https://www.kalolwala.com" target="_blank" style="text-decoration: none; display: inline-block;">
                          <img
                            src="https://source.kalolwala.com/welcome/KA%26A_Logo.png"
                            alt="Kalolwala Logo"
                            width="93"
                            height="93"
                            style="display: inline-block; border: 0; width: 93px; height: 93px;"
                          />
                        </a>
                      </div>
                      <!-- Heading takes ~65% width, left aligned -->
                      <div class="mobile-headline-container" style="display: block; width: 80%; max-width: 80%; padding-top: 0; padding-right: 0;">
                        <h1 style="font-size: 45px; font-weight: 500; line-height: 55px; margin: 0; color: #ffde00; text-align: left; width: 100%;">
                          Never float in the sea of<br/>sameness
                        </h1>
                      </div>
                    </td>
                  </tr>

                  <!-- Mobile Greeting Row -->
                  <tr class="mobile-only" style="display: none;">
                    <td colspan="2">
                      <p class="mobile-greeting" style="font-size: 28px; font-weight: 500; color: #cdcdcd; line-height: 100%; margin: 0 0 20px 0;">
                        Dear All
                      </p>
                    </td>
                  </tr>

                  <!-- Mobile Welcome Text Row -->
                  <tr class="mobile-only" style="display: none;">
                    <td colspan="2">
                      <p class="mobile-body-text" style="font-size: 15px; font-weight: 400; color: #cdcdcd; line-height: 155%; margin: 0 0 15px 0;">
                        <%= WELCOME %>
                      </p>
                    </td>
                  </tr>

                  <!-- Mobile Profile Image Row -->
                  <tr class="mobile-only mobile-profile-section" style="display: none;">
                    <td colspan="2" style="padding: 25px 0;">
                      <img
                        class="mobile-profile-img"
                        src="https://source.kalolwala.com/welcome/employee/<%= IMAGE_SLUG %>"
                        alt="<%= NAME %>"
                        width="100%"
                        style="display: block; border: 0; width: 100%;"
                      />
                    </td>
                  </tr>

                  <!-- Mobile Quote Section Row -->
                  <tr class="mobile-only mobile-quote-section" style="display: none;">
                    <td colspan="2" style="padding: 0;">
                      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: linear-gradient(180deg, #2a2a2a 0%, #1a1a1a 100%);">
                      </table>
                    </td>
                  </tr>

                  <!-- Mobile Info Box Row -->
                  <tr class="mobile-only mobile-info-box" style="display: none;">
                    <td colspan="2" style="padding: 20px 0;">
                      <table
                        class="info-box"
                        width="100%"
                        cellpadding="0"
                        cellspacing="0"
                        border="0"
                        style="background-color: #333333;"
                      >
                        <tr>
                          <td class="yellow-bar" width="4" style="background-color: #ffcb05; width: 4px; padding: 0;">&nbsp;</td>
                          <td style="padding: 18px 15px; color: #cdcdcd;">
                            <p style="margin: 0; font-size: 14px; font-weight: 400; line-height: 160%;">
                              <strong style="font-weight: 600; color: #ffffff;"><%= ABOUT_TITLE %></strong>
                              <%= ABOUT_DESC %>
                              <a href="mailto:<%= EMAIL %>" style="color: #cdcdcd; text-decoration: underline;"><%= EMAIL %></a>
                              <br/>| <a href="tel:<%= PHONE %>" style="color: #cdcdcd; text-decoration: none;"><%= PHONE %></a>.
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Mobile Culture Text Rows -->
                  <tr class="mobile-only" style="display: none;">
                    <td colspan="2">
                      <p class="mobile-culture-text" style="font-size: 15px; font-weight: 400; color: #cdcdcd; line-height: 160%; margin: 0 0 15px 0;">
                        <span style="font-weight: 600; color: #ffcb05;"><%= NAME %></span>, <%= CULTURE_1 %>
                      </p>
                    </td>
                  </tr>

                  <tr class="mobile-only" style="display: none;">
                    <td colspan="2">
                      <p class="mobile-culture-text" style="font-size: 15px; font-weight: 400; color: #cdcdcd; line-height: 160%; margin: 0 0 15px 0;">
                        <%= CULTURE_2 %>
                      </p>
                    </td>
                  </tr>

                  <!-- Mobile Tagline Row -->
                  <tr class="mobile-only" style="display: none;">
                    <td colspan="2">
                      <p class="mobile-tagline" style="margin: 20px 0; font-size: 20px; font-weight: 500; line-height: 26px; text-transform: uppercase; color: #ffcb05; text-align: left;">
                        Because We All<br/>Rise Together.
                      </p>
                    </td>
                  </tr>

                  <!-- Mobile Signature Row -->
                  <tr class="mobile-only" style="display: none;">
                    <td colspan="4" style="padding: 0;">
                      <table width="100%" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                          <td valign="bottom" style="padding-right: 0; width: 70%; padding-bottom:30px;">
                            <p class="mobile-signature" style="margin: 0 0 10px 0; padding-bottom:30px; font-size: 15px; font-weight: 400; line-height: 110%; color: #cdcdcd;">
                              Warm regards,<br/>
                              K&A Team
                            </p>
                            <img
                              src="https://source.kalolwala.com/welcome/Decorative_Line.png"
                              alt=""
                              width="100%"
                              style="display: block; border: 0; height: auto; "
                            />
                          </td>

                          <td valign="bottom" style="padding-left: 0; width: 35%;">
                             <img
                                src="https://source.kalolwala.com/welcome/Decorative.png"
                                alt=""
                                width="100%"
                                style="display: block; border: 0; max-width: 120px; margin-left: auto; padding-bottom:6px"
                              />
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <!-- Mobile Decorative Line + Image Row -->


                  <!-- ============ DESKTOP LAYOUT ============ -->

                  <tr class="header-row">
                    <td class="header-text" width="75%" valign="middle" style="padding-right: 10px">
                      <table
                        width="100%"
                        height="142"
                        cellpadding="0"
                        cellspacing="0"
                        border="0"
                      >
                        <tr>
                          <td valign="middle" style="height: 142px">
                            <h1
                              style="
                                font-size: 55px;
                                font-weight: 500;
                                line-height: 58px;
                                margin: 0;
                                color: #ffde00;
                                text-align: left;
                              "
                            >
                              Never float in the<br />sea of sameness
                            </h1>
                          </td>
                        </tr>
                      </table>
                    </td>

                    <td class="header-logo" width="25%" align="right" valign="middle">
                      <a
                        href="https://www.kalolwala.com"
                        target="_blank"
                        style="text-decoration: none; padding-bottom:10px;"

                      >
                        <img
                          src="https://source.kalolwala.com/welcome/KA%26A_Logo.png"
                          alt="Kalolwala Logo"
                          width="110"
                          height="110"
                          style="display: block; border: 0 padding-bottom:10px"
                        />
                      </a>
                    </td>
                  </tr>

                  <tr>
                    <td colspan="2">
                      <table
                        width="100%"
                        cellpadding="0"
                        cellspacing="0"
                        border="0"
                        style="table-layout: fixed"
                      >
                        <tr class="content-row">
                          <td
                            class="left-content"
                            width="55%"
                            valign="top"
                            style="padding-right: 20px"
                          >
                            <p
                              class="greeting"
                              style="
                                font-size: 36px;
                                font-weight: 500;
                                color: #cdcdcd;
                                line-height: 100%;
                                margin: 0 0 20px 0;
                              "
                            >
                              Dear All,
                            </p>

                            <p
                              class="body-text"
                              style="
                                font-size: 17px;
                                font-weight: 400;
                                color: #cdcdcd;
                                line-height: 140%;
                                margin: 0 0 20px 0;
                              "
                            >
                              <%= WELCOME %>
                            </p>

                            <table
                              class="info-box"
                              width="100%"
                              cellpadding="0"
                              cellspacing="0"
                              border="0"
                              style="background-color: #333333"
                            >
                              <tr>
                                <td
                                  style="
                                    padding-left: 20px;
                                    padding-top: 20px;
                                    padding-bottom: 20px;
                                    padding-right: 30px;
                                  "
                                >
                                  <table
                                    cellpadding="0"
                                    cellspacing="0"
                                    border="0"
                                    width="100%"
                                  >
                                    <tr>
                                      <td
                                        class="yellow-bar"
                                        valign="top"
                                        style="background-color: #ffcb05; width: 5px;"
                                      >
                                        &nbsp;
                                      </td>
                                      <td
                                        style="
                                          padding-left: 10px;
                                          color: #cdcdcd;
                                          text-align: left;
                                        "
                                      >
                                        <p
                                          style="
                                            margin: 0;
                                            font-size: 16px;
                                            font-weight: 400;
                                            line-height: 150%;
                                          "
                                        >
                                          <strong
                                            style="
                                              font-weight: 600;
                                              color: #ffff;
                                            "
                                          ><%= ABOUT_TITLE %></strong>
                                          <%= ABOUT_DESC %>
                                          <a
                                            href="mailto:<%= EMAIL %>"
                                            style="
                                              color: #cdcdcd;
                                              text-decoration: underline;
                                            "
                                          ><%= EMAIL %></a>
                                          &nbsp;|
                                          <a
                                            href="tel:<%= PHONE %>"
                                            style="
                                              color: #cdcdcd;
                                              text-decoration: none;
                                            "
                                          ><%= PHONE %></a>.
                                        </p>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>

                            <p
                              class="culture-text"
                              style="
                                font-size: 17px;
                                font-weight: 400;
                                color: #cdcdcd;
                                line-height: 150%;
                                margin: 40px 0 20px 0;
                                text-align: left;
                              "
                            >
                              <span style="font-weight: 600; color: #ffcb05"
                                ><%= NAME %></span>, <%= CULTURE_1 %>
                            </p>

                            <p
                              class="culture-text"
                              style="
                                font-size: 17px;
                                font-weight: 400;
                                color: #cdcdcd;
                                line-height: 150%;
                                margin: 0;
                                text-align: left;
                              "
                            >
                              <%= CULTURE_2 %>
                            </p>

                            <p
                              class="tagline"
                              style="
                                margin: 30px 0 0 0;
                                font-size: 27px;
                                font-weight: 500;
                                line-height: 100%;
                                text-transform: uppercase;
                                color: #ffcb05;
                                text-align: left;
                                padding-top: 20px;
                              "
                            >
                              Because We All Rise Together.
                            </p>

                            <p
                              class="signature"
                              style="
                                margin: 30px 0 0 0;
                                font-size: 16px;
                                font-weight: 400;
                                line-height: 90%;
                                color: #cdcdcd;
                                text-align: left;
                              "
                            >
                              Warm regards,<br />
                              <br />
                              K&A Team
                            </p>

                            <img
                              src="https://source.kalolwala.com/welcome/Decorative_Line.png"
                              alt="Decorative Line"
                              width="100%"
                              style="
                                display: block;
                                border: 0;
                                margin: 25px 0 0 0;
                                max-width: 530px;
                              "
                            />

                            <table
                              class="footer-wrapper desktop-footer"
                              width="100%"
                              cellpadding="0"
                              cellspacing="0"
                              border="0"
                              style="table-layout: fixed; padding-top: 10px"
                            >
                              <tr>
                                <td
                                  class="footer-spacer"
                                  height="10"
                                  style="font-size: 0; line-height: 0"
                                >
                                  &nbsp;
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <table
                                    class="footer-table"
                                    cellpadding="0"
                                    cellspacing="0"
                                    border="0"
                                    style="width: 100%"
                                  >
                                    <tr>
                                      <td
                                        class="footer-cell"
                                        valign="middle"
                                        style="
                                          padding-right: 35px;
                                          white-space: nowrap;
                                        "
                                      >
                                        <a
                                          href="https://www.kalolwala.com"
                                          target="_blank"
                                          style="text-decoration: none"
                                        >
                                          <img
                                            src="https://source.kalolwala.com/welcome/Globe.png"
                                            width="22"
                                            height="24"
                                            style="
                                              display: inline-block;
                                              border: 0;
                                              vertical-align: middle;
                                            "
                                            alt="Globe Icon"
                                          />
                                        </a>
                                        <a
                                          href="https://www.kalolwala.com"
                                          target="_blank"
                                          style="
                                            color: #969696;
                                            text-decoration: none;
                                            font-size: 14px;
                                            font-weight: 200;
                                            line-height: 28px;
                                            padding-left: 4px;
                                            display: inline-block;
                                            vertical-align: middle;
                                            white-space: nowrap;
                                          "
                                        >
                                          www.kalolwala.com
                                        </a>
                                      </td>

                                      <td
                                        class="footer-cell social-links"
                                        valign="middle"
                                        style="
                                          padding-right: 30px;
                                          width: 34%;
                                          text-align: left;
                                          white-space: nowrap;
                                        "
                                      >
                                        <a
                                          href="https://www.facebook.com/kalolwalaassociates/"
                                          target="_blank"
                                          style="
                                            text-decoration: none;
                                            margin-right: 18px;
                                          "
                                        >
                                          <img
                                            src="https://source.kalolwala.com/welcome/Facebook.png"
                                            width="12"
                                            height="22"
                                            style="
                                              display: inline-block;
                                              border: 0;
                                            "
                                            alt="Facebook"
                                          />
                                        </a>
                                        <a
                                          href="https://x.com/kalolwalaassoc"
                                          target="_blank"
                                          style="
                                            text-decoration: none;
                                            margin-right: 18px;
                                          "
                                        >
                                          <img
                                            src="https://source.kalolwala.com/welcome/Twitter.png"
                                            width="22"
                                            height="22"
                                            style="
                                              display: inline-block;
                                              border: 0;
                                            "
                                            alt="Twitter"
                                          />
                                        </a>
                                        <a
                                          href="https://www.instagram.com/kalolwalaassociates?igsh=MTllNXB0cHU4em53dw=="
                                          target="_blank"
                                          style="
                                            text-decoration: none;
                                            margin-right: 18px;
                                          "
                                        >
                                          <img
                                            src="https://source.kalolwala.com/welcome/Instagram.png"
                                            width="22"
                                            height="22"
                                            style="
                                              display: inline-block;
                                              border: 0;
                                            "
                                            alt="Instagram"
                                          />
                                        </a>
                                        <a
                                          href="https://in.linkedin.com/company/kalolwala-associates-private-limited"
                                          target="_blank"
                                          style="
                                            text-decoration: none;
                                            margin-right: 18px;
                                          "
                                        >
                                          <img
                                            src="https://source.kalolwala.com/welcome/Linkedin.png"
                                            width="22"
                                            height="22"
                                            style="
                                              display: inline-block;
                                              border: 0;
                                            "
                                            alt="LinkedIn"
                                          />
                                        </a>
                                        <a
                                          href="https://www.youtube.com/@kalolwalaassociates5465"
                                          target="_blank"
                                          style="text-decoration: none"
                                        >
                                          <img
                                            src="https://source.kalolwala.com/welcome/Youtube.png"
                                            width="22"
                                            height="18"
                                            style="
                                              display: inline-block;
                                              border: 0;
                                            "
                                            alt="YouTube"
                                          />
                                        </a>
                                      </td>

                                      <td
                                        class="footer-cell"
                                        valign="middle"
                                        style="white-space: nowrap"
                                      >
                                        <a
                                          href="mailto:info@kalolwala.com"
                                          style="text-decoration: none"
                                        >
                                          <img
                                            src="https://source.kalolwala.com/welcome/Email.png"
                                            width="25"
                                            height="31"
                                            style="
                                              display: inline-block;
                                              border: 0;
                                              vertical-align: middle;
                                            "
                                            alt="Mail Icon"
                                          />
                                        </a>
                                        <a
                                          href="mailto:info@kalolwala.com"
                                          style="
                                            color: #969696;
                                            text-decoration: none;
                                            font-size: 16px;
                                            font-weight: 500;
                                            line-height: 28px;
                                            padding-left: 4px;
                                            display: inline-block;
                                            vertical-align: middle;
                                            white-space: nowrap;
                                          "
                                        >
                                          info@kalolwala.com
                                        </a>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                          </td>

                          <td class="right-content" width="45%" valign="top">
                            <table
                              width="100%"
                              cellpadding="0"
                              cellspacing="0"
                              border="0"
                            >
                              <tr>
                                <td class="profile-img-container" align="center" style="padding: 0; position: relative;">
                                  <img
                                    class="profile-img"
                                    src="https://source.kalolwala.com/welcome/employee/<%= IMAGE_SLUG %>"
                                    alt="<%= NAME %>"
                                    width="100%"
                                    style="
                                      display: block;
                                      border: 0;
                                      max-width: 465px;
                                    "
                                  />
                                </td>
                              </tr>
                              <tr class="decorative-row">
                                <td
                                  align="right"
                                  valign="bottom"
                                  style="padding: 0; "
                                >
                                  <img
                                    class="decorative-img"
                                    src="https://source.kalolwala.com/welcome/Decorative.png"
                                    width="70%"
                                    style="
                                      display: block;
                                      border: 0;
                                      max-width: 280px;
                                      opacity: 0.85;
                                      margin-left: auto;
                                    "
                                    alt="Decorative"
                                  />
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>

                <!-- ============ MOBILE FOOTER ============ -->
                <div class="mobile-footer" style="display: none;">
                  <table
                    width="100%"
                    cellpadding="0"
                    cellspacing="0"
                    border="0"
                    style=""
                  >
                    <tr class="mobile-footer-row">
                      <td class="mobile-footer-cell" style="padding: 8px 0; width: 50%; vertical-align: middle; text-align: left; padding-right:4px;">
                        <a
                          href="https://www.kalolwala.com"
                          target="_blank"
                          style="text-decoration: none; display: inline-block;"
                        >
                          <img
                            src="https://source.kalolwala.com/welcome/Globe.png"
                            width="18"
                            height="20"
                            style="display: inline-block; border: 0; vertical-align: middle; "
                            alt="Globe Icon"
                          />
                          <span style="color: #969696; text-decoration: none; font-size: 14px; font-weight: 300; vertical-align: middle;">www.kalolwala.com</span>
                        </a>
                      </td>
                      <td class="mobile-footer-cell" width: 50%; vertical-align: middle; text-align: left;">
                        <a
                          href="mailto:info@kalolwala.com"
                          style="text-decoration: none; display: inline-block;"
                        >
                          <img
                            src="https://source.kalolwala.com/welcome/Email.png"
                            width="20"
                            height="25"
                            style="display: inline-block; border: 0; vertical-align: middle; "
                            alt="Mail Icon"
                          />
                          <span style="color: #969696; text-decoration: none; font-size: 14px; font-weight: 300; vertical-align: middle;">info@kalolwala.com</span>
                        </a>
                      </td>
                    </tr>
                    <tr class="mobile-social-row">
                      <td colspan="2" style="text-align: center; padding-top: 20px;">
                        <a
                          href="https://www.facebook.com/kalolwalaassociates/"
                          target="_blank"
                          style="text-decoration: none; margin: 0 10px; display: inline-block;"
                        >
                          <img
                            src="https://source.kalolwala.com/welcome/Facebook.png"
                            width="12"
                            height="22"
                            style="display: inline-block; border: 0;"
                            alt="Facebook"
                          />
                        </a>
                        <a
                          href="https://x.com/kalolwalaassoc"
                          target="_blank"
                          style="text-decoration: none; margin: 0 10px; display: inline-block;"
                        >
                          <img
                            src="https://source.kalolwala.com/welcome/Twitter.png"
                            width="22"
                            height="22"
                            style="display: inline-block; border: 0;"
                            alt="Twitter"
                          />
                        </a>
                        <a
                          href="https://www.instagram.com/kalolwalaassociates?igsh=MTllNXB0cHU4em53dw=="
                          target="_blank"
                          style="text-decoration: none; margin: 0 10px; display: inline-block;"
                        >
                          <img
                            src="https://source.kalolwala.com/welcome/Instagram.png"
                            width="22"
                            height="22"
                            style="display: inline-block; border: 0;"
                            alt="Instagram"
                          />
                        </a>
                        <a
                          href="https://in.linkedin.com/company/kalolwala-associates-private-limited"
                          target="_blank"
                          style="text-decoration: none; margin: 0 10px; display: inline-block;"
                        >
                          <img
                            src="https://source.kalolwala.com/welcome/Linkedin.png"
                            width="22"
                            height="22"
                            style="display: inline-block; border: 0;"
                            alt="LinkedIn"
                          />
                        </a>
                        <a
                          href="https://www.youtube.com/@kalolwalaassociates5465"
                          target="_blank"
                          style="text-decoration: none; margin: 0 10px; display: inline-block;"
                        >
                          <img
                            src="https://source.kalolwala.com/welcome/Youtube.png"
                            width="22"
                            height="18"
                            style="display: inline-block; border: 0;"
                            alt="YouTube"
                          />
                        </a>
                      </td>
                    </tr>
                  </table>
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
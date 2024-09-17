import ExtensionsHeader from "@components/extensions-header";
import { useEffect } from "react";
import { useState, memo } from "react";
import { FormattedMessage } from "react-intl";

import { Button, Col, FormGroup, Input, Label, Media, Row } from "reactstrap";

const SectionSystem = ({ aboutData }) => {
  const [intro, setIntro] = useState();
  useEffect(() => {
    const content =
      aboutData?.section_system && JSON.parse(aboutData?.section_system);
    content &&
      setIntro({
        link_facebook: content.link_facebook,
        link_zalo: content.link_zalo,
        link_instagram: content.link_instagram,
        link_youtube: content.link_youtube,
        bank: content.bank,
        bank_number: content.bank_number,
        bank_user: content.bank_user,
      });
  }, [aboutData]);

  return (
    <div id="section-system">
      <div className="text-center">
        <ExtensionsHeader title={<FormattedMessage id="section_system" />} />
      </div>
      <>
        <div className="post" id={"section-system-" + (1 + 1)}>
          <Row>
            <Col xs={12} md={12}>
              <FormGroup>
                <Label for="header">
                  <FormattedMessage id="system_facebook" />{" "}
                </Label>
                <Input
                  name="link_facebook"
                  defautlValue={intro?.link_facebook}
                  value={intro?.link_facebook || ""}
                  onChange={(e) => {
                    setIntro({ ...intro, link_facebook: e.target.value });
                  }}
                />
              </FormGroup>
            </Col>

            <Col xs={12} md={12}>
              <FormGroup>
                <Label for="header">
                  <FormattedMessage id="system_zalo" />{" "}
                </Label>
                <Input
                  name="link_zalo"
                  defautlValue={intro?.link_zalo}
                  value={intro?.link_zalo || ""}
                  onChange={(e) => {
                    setIntro({ ...intro, link_zalo: e.target.value });
                  }}
                />
              </FormGroup>
            </Col>

            <Col xs={12} md={12}>
              <FormGroup>
                <Label for="short_header">
                  <FormattedMessage id="system_instagram" />{" "}
                </Label>
                <Input
                  name="link_instagram"
                  defautlValue={intro?.link_instagram}
                  value={intro?.link_instagram || ""}
                  onChange={(e) => {
                    setIntro({ ...intro, link_instagram: e.target.value });
                  }}
                />
              </FormGroup>
            </Col>
            <Col xs={12} md={12}>
              <FormGroup>
                <Label for="title">
                  <FormattedMessage id="system_youtube" />{" "}
                </Label>
                <Input
                  name="link_youtube"
                  defautlValue={intro?.link_youtube}
                  value={intro?.link_youtube || ""}
                  onChange={(e) => {
                    setIntro({ ...intro, link_youtube: e.target.value });
                  }}
                />
              </FormGroup>
            </Col>

            <Col xs={12} md={12}>
              <FormGroup>
                <Label for="content">
                  <FormattedMessage id="system_bank" />{" "}
                </Label>
                <Input
                  name="bank"
                  defautlValue={intro?.bank}
                  value={intro?.bank || ""}
                  onChange={(e) => {
                    setIntro({ ...intro, bank: e.target.value });
                  }}
                />
              </FormGroup>
            </Col>
            <Col xs={12} md={12}>
              <FormGroup>
                <Label for="title">
                  <FormattedMessage id="system_bank_number" />{" "}
                </Label>
                <Input
                  name="bank_number"
                  defautlValue={intro?.bank_number}
                  value={intro?.bank_number || ""}
                  onChange={(e) => {
                    setIntro({ ...intro, bank_number: e.target.value });
                  }}
                />
              </FormGroup>
            </Col>
            <Col xs={12} md={12}>
              <FormGroup>
                <Label for="content">
                  <FormattedMessage id="system_bank_user" />{" "}
                </Label>
                <Input
                  name="bank_user"
                  defautlValue={intro?.bank_user}
                  value={intro?.bank_user || ""}
                  onChange={(e) => {
                    setIntro({ ...intro, bank_user: e.target.value });
                  }}
                />
              </FormGroup>
            </Col>
          </Row>
        </div>
      </>
    </div>
  );
};
export default memo(SectionSystem);

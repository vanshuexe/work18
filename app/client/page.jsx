import PageShell from "../../components/PageShell";
import Content from "../../components/pages/InquiryPage";
import data from "../../lib/data";
import inquiries from "../../config/inquiries";
export const metadata = {
  title: inquiries.client.title,
  description: inquiries.client.subtitle,
};
export default function Page() {
  return (
    <PageShell active="" behavior="inquiry" headerTheme="dark" hideFooter={false}>
      <Content type="client" countries={data.getCountries()} />
    </PageShell>
  );
}

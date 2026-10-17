import PageShell from "../../components/PageShell";
import Content from "../../components/pages/InquiryPage";
import data from "../../lib/data";
import inquiries from "../../config/inquiries";
export const metadata = {
  title: inquiries.investor.title,
  description: inquiries.investor.subtitle,
};
export default function Page() {
  return (
    <PageShell active="" behavior="inquiry" headerTheme="dark" hideFooter={false}>
      <Content type="investor" countries={data.getCountries()} />
    </PageShell>
  );
}

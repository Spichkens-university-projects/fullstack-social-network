import Head from "next/head";

interface IHeadTag {
  title: string;
}
const HeadTag = ({ title }: IHeadTag) => {
  return (
    <Head>
      <title>{title}</title>
    </Head>
  );
};

export default HeadTag;

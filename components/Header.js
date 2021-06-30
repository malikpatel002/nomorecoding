import Head from "next/head";

const Header = () => {
  return (
    <Head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>NoMoreCoding Dashboard</title>

      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600;700;800&display=swap"
        rel="stylesheet"
      />
      <link rel="stylesheet" type="text/css" href="/css/bootstrap.css" />

      <link
        rel="stylesheet"
        type="text/css"
        href="/vendors/perfect-scrollbar/perfect-scrollbar.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="/vendors/bootstrap-icons/bootstrap-icons.css"
      />
      <link rel="stylesheet" type="text/css" href="/css/app.css" />
    </Head>
  );
};

export default Header;

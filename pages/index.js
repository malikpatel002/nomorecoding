import Head from "next/head";
import Link from "next/link";

function Home() {
  return (
    <div>
      <Head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>NoMoreCoding</title>

        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/css/bootstrap.css" />

        <link
          rel="stylesheet"
          href="/vendors/bootstrap-icons/bootstrap-icons.css"
        />
        <link rel="stylesheet" href="/css/app.css" />
      </Head>

      <div id="app">
        <div id="main">
          <div className="page-heading">
            <div className="page-title">
              <div className="row">
                <div className="col-12 col-md-6 order-md-1 order-last">
                  <h3>NoMoreCoding</h3>
                </div>
              </div>
            </div>
            <section className="section">
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-body">
                      <h6>Login using Email.</h6>

                      <div className="buttons">
                        <Link href="/login">
                          <a className="btn btn-primary rounded-pill">Login</a>
                        </Link>
                      </div>
                      <hr />
                      <h6>New User</h6>
                      <div className="buttons">
                        <Link href="/signup">
                          <a className="btn btn-primary rounded-pill">
                            Sign up
                          </a>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      <script src="/js/bootstrap.bundle.min.js"></script>
      <script src="/js/main.js"></script>
    </div>
  );
}
export default Home;

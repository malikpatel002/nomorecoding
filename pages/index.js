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
          href="assets/vendors/perfect-scrollbar/perfect-scrollbar.css"
        />
        <link
          rel="stylesheet"
          href="/vendors/bootstrap-icons/bootstrap-icons.css"
        />
        <link rel="stylesheet" href="/css/app.css" />
        {/* <link
          rel="shortcut icon"
          href="/images/favicon.svg"
          type="image/x-icon"
        /> */}
      </Head>

      <div id="app">
        <div id="main">
          <div class="page-heading">
            <div class="page-title">
              <div class="row">
                <div class="col-12 col-md-6 order-md-1 order-last">
                  <h3>NoMoreCoding</h3>
                </div>
              </div>
            </div>
            <section class="section">
              <div class="row">
                <div class="col-12">
                  <div class="card">
                    <div class="card-body">
                      <h6>Login using Email.</h6>

                      <div class="buttons">
                        <a href="login" class="btn btn-primary rounded-pill">
                          Login
                        </a>
                      </div>
                      <hr />
                      <h6>New User</h6>
                      <div class="buttons">
                        <a href="signup" class="btn btn-primary rounded-pill">
                          Sign up
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      <script src="/vendors/perfect-scrollbar/perfect-scrollbar.min.js"></script>
      <script src="/js/bootstrap.bundle.min.js"></script>

      <script src="/js/main.js"></script>
      {/* <Head>
        <title>Welcome to landing page</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <h1>Simplest login</h1>

      <h2>Proudly using Next.js, Mongodb and deployed with Now</h2>
      <Link href="/login">Login</Link>
      <p>or</p>
      <Link href="/signup">Sign Up</Link> */}
    </div>
  );
}
export default Home;

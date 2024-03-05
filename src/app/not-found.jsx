import Link from "next/link";


export default function PageNotFound() {
  return (<>
      <section className="spacing-150 text-center">
        <div className="container">
          <div className="row">
            <div className="col-12 d-flex align-items-center justify-content-center">
              <div className="text-center">
                <h1 className="text-primary"  style={{ fontSize: '10vw', lineHeight: '0.8' }}>404</h1>
                <p  className="text-uppercase font-weight-600 text-tertiary mt-5">WE ARE SORRY, BUT THE PAGE YOU REQUESTED WAS NOT FOUND</p>
                <Link aria-label="Go home" className="btn btn-primary py-3 px-4 mt-sm-4 mt-1" href={'/'}>Go home</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
  </>)
}
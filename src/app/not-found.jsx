import Link from "next/link";


export default function PageNotFound() {
  return (<>
    <div style={{ marginTop: '70px' }}>
      <section className="spacing-150 text-center">
        <div className="container">
          <div className="row">
            <div className="col-12 d-flex align-items-center justify-content-center">
              <div className="text-center">
                <h1 className="text-primary"  style={{ fontSize: '10vw' }}>404</h1>
                <p  className="text-uppercase heading-tertiary text-tertiary">WE ARE SORRY, BUT THE PAGE YOU REQUESTED WAS NOT FOUND</p>
                <Link aria-label="Go home" className="btn btn-primary py-3 px-4 mt-sm-4 mt-1" href={'/'}>Go home</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </>)
}
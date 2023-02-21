/** @implements {import('@playwright/test/reporter').Reporter} */
class ThisReporter {
  onBegin(config, suite) {
    //console.log(`Starting the run with ${suite.allTests().length} tests`);
  }

  onTestBegin(test) {
    //console.log(`Starting test ${test.title}`);
  }

  onTestEnd(test, result) {
    //console.log(`Finished test ${test.title}: ${result.status}`);
  }

  onEnd(result) {
    //console.log(`Finished the run: ${result.status}`);
  }

  onStdOut(chunk, test, result) {
    console.log(`${chunk}`);
  }
  onStdErr(chunk, test, result) {
    console.error(`${chunk}`);
  }

  printsToStdio() {
    return true;
  }
}

module.exports = ThisReporter;
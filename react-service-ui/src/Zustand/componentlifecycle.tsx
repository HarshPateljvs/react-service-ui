import { Component } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";

interface State {
  loadingProgress: number;
  lifecycleStage: string;
}

class ComponentLifecycle extends Component<object, State> {
  constructor(props: object) {
    super(props);
    this.state = {
      loadingProgress: 25,
      lifecycleStage: "Constructor (25%)",
    };
    console.log("Constructor: 25%");
  }

  componentDidMount() {
    console.log("componentDidMount: 50%");
    this.setState({
      loadingProgress: 50,
      lifecycleStage: "Mounted (50%)",
    });
  }

  componentDidUpdate(_: object, prevState: State) {
    if (prevState.loadingProgress === 50 && this.state.loadingProgress === 50) {
      console.log("componentDidUpdate: 75%");
      this.setState({
        loadingProgress: 75,
        lifecycleStage: "Updated Once (75%)",
      });
    } else if (prevState.loadingProgress === 75 && this.state.loadingProgress === 75) {
      console.log("componentDidUpdate: 100%");
      this.setState({
        loadingProgress: 100,
        lifecycleStage: "Completed (100%)",
      });
    }
  }

  componentWillUnmount() {
    console.log("componentWillUnmount: Component cleanup.");
  }

  renderLoader() {
    if (this.state.loadingProgress >= 100) return null;
    return (
      <LinearProgress
        variant="determinate"
        value={this.state.loadingProgress}
        sx={{
          height: 3,
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
        }}
      />
    );
  }

  render() {
    return (
      <div>
        <AppBar position="static" sx={{ position: "relative" }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              My App with Lifecycle Loader
            </Typography>
          </Toolbar>
          {this.renderLoader()}
        </AppBar>

        <Box sx={{ padding: "20px" }}>
          <h2>Lifecycle Stage: {this.state.lifecycleStage}</h2>
          <h3>Progress: {this.state.loadingProgress}%</h3>

          {this.state.loadingProgress === 100 && (
            <div>
              <h1>Component Lifecycle Complete</h1>
              <p>All lifecycle stages have been completed successfully.</p>
            </div>
          )}
        </Box>
      </div>
    );
  }
}

export default ComponentLifecycle;

export const styles = `
body,
html {
  margin: 0;
  padding: 0;
  font-family: Arial, Helvetica, sans-serif;
  background-color: black;
}

h1 {
  color: white;
}
.row {
  display: flex;
  width: calc(100% - 2rem);
  margin: 1rem;
  gap: 1rem;
}
.row > div {
  flex: 1 1;
  width: 50%;

  background-color: darkgray;

  padding: 1rem;
}

table tr pre {
  height: 2rem;
  width: 15rem;
  overflow: hidden;
}
table tr:hover pre {
  height: unset;
  overflow-y: vi;
}

.tail-status {
  background-color: red;
  padding: 20px
}
`;

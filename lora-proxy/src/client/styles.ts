export const styles = `
body,
html {
  margin: 0;
  padding: 0;
  font-family: Arial, Helvetica, sans-serif;
  background-color: black;
}

.row {
  display: flex;
  width: calc(100% - 2rem);
  margin: 1rem;
  gap: 1rem;
  flex-wrap: wrap;
}
.row > div {
  flex: 1 1;
  width: 50%;

  background-color: darkgray;

  padding: 1rem;
  border-radius: 5px;
}

.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}
h1 {
  color: white;
}
.header .buttons {
  display: flex;
}

.header .buttons * {
  text-decoration: none;
  color: black;
}

.header .buttons a {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 10px;
}
.header .buttons a:first-child {
  padding-left: 0;
}

.header .buttons img {
  margin: 5px;
  width: 50px;
  height: 50px;
}


table.log-table tr pre {
  height: 2rem;
  width: 15rem;
  overflow: hidden;
}
table.log-table tr:hover pre {
  height: unset;
  overflow-y: vi;
}

.tail-status {
  background-color: red;
  padding: 20px
}
`;

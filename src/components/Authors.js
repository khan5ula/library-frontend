import { useQuery } from "@apollo/client"
import { ALL_AUTHORS } from "../queries"
import { Table } from "react-bootstrap"

const Authors = (props) => {
	const result = useQuery(ALL_AUTHORS, {
		pollInterval: 10000,
	})

	if (result.loading) {
		return <div>loading...</div>
	}

	const authors = result.data.allAuthors

	return (
		<div>
			<h1 style={{ marginBottom: "20px" }}>Authors</h1>
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>
							<h3>Author</h3>
						</th>
						<th>
							<h3>Born</h3>
						</th>
						<th>
							<h3>Books</h3>
						</th>
					</tr>
				</thead>
				<tbody>
					{authors.map((a) => (
						<tr key={a.name}>
							<td>{a.name}</td>
							<td>{a.born}</td>
							<td>{a.bookCount}</td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	)
}

export default Authors

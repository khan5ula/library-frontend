import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from "../queries"
import { Table } from "react-bootstrap"

const Books = () => {
	const result = useQuery(ALL_BOOKS, {
		pollInterval: 10000,
	})

	if (result.loading) {
		return <div>loading...</div>
	}

	const books = result.data.allBooks

	return (
		<div>
			<h1 style={{ marginBottom: "20px" }}>Books</h1>
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>
							<h3>Title</h3>
						</th>
						<th>
							<h3>Author</h3>
						</th>
						<th>
							<h3>Published</h3>
						</th>
					</tr>
				</thead>
				<tbody>
					{books.map((b) => (
						<tr key={b.title}>
							<td>{b.title}</td>
							<td>{b.author}</td>
							<td>{b.published}</td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	)
}

export default Books

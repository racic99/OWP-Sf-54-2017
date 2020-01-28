package baza;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import model.Sala;

public class SalaDAO {
	
	public static List<Sala> getAll() {
		List<Sala> sale = new ArrayList<>();

		Connection conn = ConnectionManager.getConnection();
		PreparedStatement pstmt = null;
		ResultSet rset = null;
		try {
			String query = "SELECT id, naziv, brojSedista, tipoviProjekcija FROM sale";

			pstmt = conn.prepareStatement(query);

			rset = pstmt.executeQuery();

			while (rset.next()) {
				int index = 1;
				int id = rset.getInt(index++);
				String naziv = rset.getString(index++);
				int brojSedista = rset.getInt(index++);
				String tipoviProjekcija = rset.getString(index++);


				Sala sala = new Sala(id, naziv, brojSedista, tipoviProjekcija);
				
				sale.add(sala);
			}
		} catch (Exception ex) {
			ex.printStackTrace();
		} finally {
			try {
				pstmt.close();
			} catch (Exception ex1) {
				ex1.printStackTrace();
			}
			try {
				rset.close();
			} catch (Exception ex1) {
				ex1.printStackTrace();
			}
			try {
				conn.close();
			} catch (Exception ex1) {
				ex1.printStackTrace();
			}
		}

		return sale;
	}

}

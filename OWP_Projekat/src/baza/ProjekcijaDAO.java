package baza;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import model.Projekcija;

public class ProjekcijaDAO {

	public static List<Projekcija> getAll() {
		List<Projekcija> projekcije = new ArrayList<>();

		ConnectionManager.open();
		
		Connection conn = ConnectionManager.getConnection();
		PreparedStatement pstmt = null;
		ResultSet rset = null;
		try {
			String query = "SELECT id, film, tip, sala, datumVreme, cenaKarte, admin, aktivan "
					+ "FROM projekcije WHERE aktivan = 1";

			pstmt = conn.prepareStatement(query);

			rset = pstmt.executeQuery();

			while (rset.next()) {
				int index = 1;
				int id = rset.getInt(index++);
				int film = rset.getInt(index++);
				int tip = rset.getInt(index++);
				int sala = rset.getInt(index++);
				String datumVreme = rset.getString(index++);
				int cenaKarte = rset.getInt(index++);
				String administrator = rset.getString(index++);
				boolean aktivan = rset.getBoolean(index++);

				Projekcija projekcija = new Projekcija(id, film, tip, sala, datumVreme, cenaKarte, administrator, aktivan);
				
				projekcije.add(projekcija);
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

		return projekcije;
	}
	
}

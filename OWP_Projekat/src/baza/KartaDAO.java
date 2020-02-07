package baza;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import model.Karta;

public class KartaDAO {
	
	public static List<Karta> karteKorisnika(String korime) {
		List<Karta> karte = new ArrayList<>();

		ConnectionManager.open();
		
		Connection conn = ConnectionManager.getConnection();
		PreparedStatement pstmt = null;
		ResultSet rset = null;
		try {
			String query = "SELECT id, projekcija, sediste, datumVremeProdaje, korisnik FROM karte WHERE korisnik = ?"
					+" ORDER BY datumVremeProdaje DESC";

			pstmt = conn.prepareStatement(query);
			int index = 1;
			pstmt.setString(index++,korime);

			rset = pstmt.executeQuery();

			while (rset.next()) {
				index = 1;
				int id = rset.getInt(index++);
				int projekcija = rset.getInt(index++);
				int sediste = rset.getInt(index++);
				String datumVreme = rset.getString(index++);

				Karta karta = new Karta(id, projekcija, sediste, datumVreme, korime);
				
				karte.add(karta);
			}
		} catch (Exception ex) {
			ex.printStackTrace();
		} finally {
			try {pstmt.close();} catch (Exception ex1) {ex1.printStackTrace();}
			try {rset.close();} catch (Exception ex1) {ex1.printStackTrace();}
			try {conn.close();} catch (Exception ex1) {ex1.printStackTrace();}
		}

		return karte;
	}

}

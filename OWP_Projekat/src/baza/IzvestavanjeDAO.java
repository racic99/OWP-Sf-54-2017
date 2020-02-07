package baza;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import model.Izvestavanje;

public class IzvestavanjeDAO {
	
	public static List<Izvestavanje> getAll(String datum1, String datum2) {
		List<Izvestavanje> izvestavanje = new ArrayList<>();

		ConnectionManager.open();
		
		Connection conn = ConnectionManager.getConnection();

		PreparedStatement pstmt = null;
		ResultSet rset = null;
		try {
			String query = "SELECT f.naziv, COUNT(p.id) " + 
					"FROM filmovi f INNER JOIN projekcije p ON f.id = p.film " + 
					"WHERE p.datumVreme >= ? AND p.datumVreme <= ? " + 
					"GROUP BY f.naziv ORDER BY f.naziv";

			pstmt = conn.prepareStatement(query);
			int index = 1;
			pstmt.setString(index++, datum1);
			pstmt.setString(index++, datum2);
			rset = pstmt.executeQuery();
			
			while (rset.next()) {
				index = 1;
				String naziv = rset.getString(index++);
				int brojLetova = rset.getInt(index++);

				Izvestavanje izv = new Izvestavanje(naziv,brojLetova,0,0);
	
				izvestavanje.add(izv);
			}
			PreparedStatement pstmt1 = null;
			ResultSet rset1 = null;
			try {
				query = "SELECT f.naziv, COUNT(k.datumVremeProdaje), SUM(p.cenaKarte) " + 
						"FROM projekcije p, filmovi f INNER JOIN karte k ON p.id = k.projekcija AND f.id = p.film " + 
						"WHERE k.datumVremeProdaje >= ? AND k.datumVremeProdaje <= ? AND p.datumVreme >= ? AND p.datumVreme <= ? " + 
						"GROUP BY p.film ORDER BY p.film";
				
				pstmt1 = conn.prepareStatement(query);
				index = 1;
				pstmt1.setString(index++, datum1);
				pstmt1.setString(index++, datum2);
				pstmt1.setString(index++, datum1);
				pstmt1.setString(index++, datum2);
				rset1 = pstmt1.executeQuery();
				
				while (rset1.next()) {
					index = 1;
					String naziv = rset1.getString(index++);
					int brojProdatih = rset1.getInt(index++);
					int cena = rset1.getInt(index++);
					for (Izvestavanje i : izvestavanje) {
						if(naziv.contentEquals(i.getNazivFilma())) {
							i.setBrojProdatihKarata(brojProdatih);
							i.setUkupnaCena(cena);
						}
					}
				}
			}catch(Exception ex) {
				ex.printStackTrace();
			}finally {
				try {pstmt1.close();} catch (Exception ex1) {ex1.printStackTrace();}
				try {rset1.close();} catch (Exception ex1) {ex1.printStackTrace();}
				try {conn.close();} catch (Exception ex1) {ex1.printStackTrace();}
			}
		} catch (Exception ex) {
			ex.printStackTrace();
		} finally {
			try {pstmt.close();} catch (Exception ex1) {ex1.printStackTrace();}
			try {rset.close();} catch (Exception ex1) {ex1.printStackTrace();}
			try {conn.close();} catch (Exception ex1) {ex1.printStackTrace();}
		}
		
		return izvestavanje;
	}

}

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
	
	public static List<Projekcija> getNazivFilma(String nazivFilmaPretraga) {
		List<Projekcija> projekcije = new ArrayList<>();
		
		ConnectionManager.open();
		
		Connection conn = ConnectionManager.getConnection();

		PreparedStatement pstmt = null;
		ResultSet rset = null;
		try {
			String query = "SELECT p.id, p.film, p.tip, p.sala, p.datumVreme, p.cenaKarte, p.admin, p.aktivan FROM "
					+ "projekcije p, filmovi f WHERE p.film = f.id AND f.naziv LIKE ?";	 

			pstmt = conn.prepareStatement(query);
			int index = 1;
			pstmt.setString(index++, "%" + nazivFilmaPretraga + "%");

			rset = pstmt.executeQuery();

			while (rset.next()) {
				index = 1;
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
			try {pstmt.close();} catch (Exception ex1) {ex1.printStackTrace();}
			try {rset.close();} catch (Exception ex1) {ex1.printStackTrace();}
			try {conn.close();} catch (Exception ex1) {ex1.printStackTrace();}
		}
		
		return projekcije;
	}
	
	public static List<Projekcija> getTipProjekcije(String tipProjekcijePretraga) {
		List<Projekcija> projekcije = new ArrayList<>();
		
		ConnectionManager.open();
		
		Connection conn = ConnectionManager.getConnection();

		PreparedStatement pstmt = null;
		ResultSet rset = null;
		try {
			String query = "SELECT p.id, p.film, p.tip, p.sala, p.datumVreme, p.cenaKarte, p.admin, p.aktivan FROM "
					+ "projekcije p, tipovipr t WHERE p.film = t.id AND t.naziv LIKE ?";	 

			pstmt = conn.prepareStatement(query);
			int index = 1;
			pstmt.setString(index++, "%" + tipProjekcijePretraga + "%");

			rset = pstmt.executeQuery();

			while (rset.next()) {
				index = 1;
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
			try {pstmt.close();} catch (Exception ex1) {ex1.printStackTrace();}
			try {rset.close();} catch (Exception ex1) {ex1.printStackTrace();}
			try {conn.close();} catch (Exception ex1) {ex1.printStackTrace();}
		}
		
		return projekcije;
	}
	
	public static List<Projekcija> getSala(String salaPretraga) {
		List<Projekcija> projekcije = new ArrayList<>();
		
		ConnectionManager.open();
		
		Connection conn = ConnectionManager.getConnection();

		PreparedStatement pstmt = null;
		ResultSet rset = null;
		try {
			String query = "SELECT p.id, p.film, p.tip, p.sala, p.datumVreme, p.cenaKarte, p.admin, p.aktivan FROM "
					+ "projekcije p, sale s WHERE p.film = s.id AND s.naziv LIKE ?";	 

			pstmt = conn.prepareStatement(query);
			int index = 1;
			pstmt.setString(index++, "%" + salaPretraga + "%");

			rset = pstmt.executeQuery();

			while (rset.next()) {
				index = 1;
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
			try {pstmt.close();} catch (Exception ex1) {ex1.printStackTrace();}
			try {rset.close();} catch (Exception ex1) {ex1.printStackTrace();}
			try {conn.close();} catch (Exception ex1) {ex1.printStackTrace();}
		}
		
		return projekcije;
	}
	
	public static List<Projekcija> getOpsegCena(String cena1, String cena2) {
		List<Projekcija> projekcije = new ArrayList<>();
		
		ConnectionManager.open();
		
		Connection conn = ConnectionManager.getConnection();

		PreparedStatement pstmt = null;
		ResultSet rset = null;
		try {
			String query = "SELECT id, film, tip, sala, datumVreme, cenaKarte, admin, aktivan FROM "
					+ "projekcije WHERE CAST(cenaKarte AS int) >= ? and CAST(cenaKarte AS int) <= ? and aktivan = 1";

			pstmt = conn.prepareStatement(query);
			int index = 1;
			pstmt.setString(index++,cena1);
			pstmt.setString(index++,cena2);

			rset = pstmt.executeQuery();

			while (rset.next()) {
				index = 1;
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
			try {pstmt.close();} catch (Exception ex1) {ex1.printStackTrace();}
			try {rset.close();} catch (Exception ex1) {ex1.printStackTrace();}
			try {conn.close();} catch (Exception ex1) {ex1.printStackTrace();}
		}
		
		return projekcije;
	}
	
}

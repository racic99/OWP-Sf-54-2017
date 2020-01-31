package aplikacija;

import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import baza.FilmDAO;
import baza.ProjekcijaDAO;
import baza.SalaDAO;
import baza.TipProjekcijeDAO;
import model.Film;
import model.Projekcija;
import model.Sala;
import model.TipProjekcije;

public class ProjekcijeServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	
		String nazivFilmaPretraga = request.getParameter("nazivFilmaPretraga");
		String tipProjekcijePretraga = request.getParameter("tipProjekcijePretraga");
		String salaPretraga = request.getParameter("salaPretraga");
		String cena1 = request.getParameter("cena1");
		String cena2 = request.getParameter("cena2");
		String datum1 = request.getParameter("datum1");
		String datum2 = request.getParameter("datum2");
		
		List<Film> filmovi = FilmDAO.getAll();
		List<Sala> sale = SalaDAO.getAll();
		List<TipProjekcije> tipoviProjekcije = TipProjekcijeDAO.getAll();
		List<Projekcija> projekcije = ProjekcijaDAO.getAll();
		
		List<Projekcija> nazivFilmovaPretraga = ProjekcijaDAO.getNazivFilma(nazivFilmaPretraga);
		List<Projekcija> tipoviProjekcijePretraga = ProjekcijaDAO.getTipProjekcije(tipProjekcijePretraga);
		List<Projekcija> salePretraga = ProjekcijaDAO.getSala(salaPretraga);
		List<Projekcija> opsegCenaPretraga = ProjekcijaDAO.getOpsegCena(cena1, cena2);
		List<Projekcija> opsegDatumaPretraga = ProjekcijaDAO.getOpsegDatuma(datum1, datum2);
		
		Map<String, Object> data = new LinkedHashMap<>();
		data.put("tipovi", tipoviProjekcije);
		data.put("sale", sale);
		data.put("filmovi", filmovi);
		data.put("projekcije", projekcije);
		
		data.put("nazivFilmovaPretraga", nazivFilmovaPretraga);
		data.put("tipoviProjekcijePretraga", tipoviProjekcijePretraga);
		data.put("salePretraga", salePretraga);
		data.put("opsegCenaPretraga", opsegCenaPretraga);
		data.put("opsegDatumaPretraga", opsegDatumaPretraga);

		request.setAttribute("data", data);
		request.getRequestDispatcher("./SuccessServlet").forward(request, response);

	
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
